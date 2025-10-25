import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { queryClient } from "@/lib/queryClient";
import type { ProgressReportEntry } from "./progress-report-table";

async function submitProgress(data: any) {
  const response = await fetch("/api/submit-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit progress report");
  }

  return response.json();
}

interface SubmitProgressFormProps {
  entries: ProgressReportEntry[];
  onEntryAdd: (entry: ProgressReportEntry) => void;
}

export function SubmitProgressForm({ entries, onEntryAdd }: SubmitProgressFormProps) {
  const { toast } = useToast();
  const [senseiName, setSenseiName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [belt, setBelt] = useState("");
  const [levelId, setLevelId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [concepts, setConcepts] = useState("");
  const [goal1Completed, setGoal1Completed] = useState(false);
  const [goal2Completed, setGoal2Completed] = useState(false);
  const [firstGoalNext, setFirstGoalNext] = useState("");
  const [secondGoalNext, setSecondGoalNext] = useState("");
  const [senseiNotes, setSenseiNotes] = useState("");
  const [suggestions, setSuggestions] = useState<ProgressReportEntry[]>([]);

  useEffect(() => {
    if (studentName) {
      const filtered = entries.filter(entry => 
        entry.studentName.toLowerCase().includes(studentName.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [studentName, entries]);

  const handleSuggestionClick = (entry: ProgressReportEntry) => {
    setStudentName(entry.studentName);
    setStudentId(entry.studentId);
    setBelt(entry.belt);
    setLevelId(entry.level);
    setSuggestions([]);
  };

  const mutation = useMutation({
    mutationFn: submitProgress,
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: `Progress report submitted successfully! Entry Number: ${data.Entry.Number}`,
      });
      const newEntry: ProgressReportEntry = {
        senseiName: variables.SENSEI_NAME,
        studentName: variables.STUDENT_NAME,
        studentId: variables.STUDENT_ID,
        belt: variables.BELT,
        level: variables.LEVEL_ID,
        projectId: variables.PROJECT_ID_TO_LOOKUP,
        concepts: variables.OTHER_DETAILS.concepts,
        goal1Completed: variables.OTHER_DETAILS.goal1Completed,
        goal2Completed: variables.OTHER_DETAILS.goal2Completed,
        firstGoalNextClass: variables.OTHER_DETAILS.firstGoalNext,
        secondGoalNextClass: variables.OTHER_DETAILS.secondGoalNext,
        senseiNotes: variables.OTHER_DETAILS.senseiNotes,
      };
      onEntryAdd(newEntry);
      // Reset form
      setSenseiName("");
      setStudentId("");
      setStudentName("");
      setBelt("");
      setLevelId("");
      setProjectId("");
      setConcepts("");
      setGoal1Completed(false);
      setGoal2Completed(false);
      setFirstGoalNext("");
      setSecondGoalNext("");
      setSenseiNotes("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
        SENSEI_NAME: senseiName,
        STUDENT_ID: studentId,
        STUDENT_NAME: studentName,
        BELT: belt,
        LEVEL_ID: levelId,
        PROJECT_ID_TO_LOOKUP: projectId,
        OTHER_DETAILS: {
            concepts: concepts,
            goal1Completed: goal1Completed,
            goal2Completed: goal2Completed,
            firstGoalNext: firstGoalNext,
            secondGoalNext: secondGoalNext,
            senseiNotes: senseiNotes,
        }
    };
    mutation.mutate(submissionData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Progress Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senseiName">Sensei Name</Label>
              <Select onValueChange={setSenseiName} value={senseiName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sensei" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eniola">Eniola</SelectItem>
                  <SelectItem value="Jessica">Jessica</SelectItem>
                  <SelectItem value="Joshua">Joshua</SelectItem>
                  <SelectItem value="Kareem">Kareem</SelectItem>
                  <SelectItem value="Kristen">Kristen</SelectItem>
                  <SelectItem value="Richard">Richard</SelectItem>
                  <SelectItem value="Sebastian">Sebastian</SelectItem>
                  <SelectItem value="Taybor">Taybor</SelectItem>
                  <SelectItem value="Yao">Yao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g., Logan Yao" />
                {suggestions.length > 0 && (
                  <div className="border rounded-md mt-1">
                    {suggestions.map(suggestion => (
                      <div key={suggestion.studentId} onClick={() => handleSuggestionClick(suggestion)} className="p-2 hover:bg-gray-200 cursor-pointer">
                        {suggestion.studentName}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g., 461" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="belt">Belt</Label>
              <Select onValueChange={setBelt} value={belt}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Belt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="White Belt">White Belt</SelectItem>
                  <SelectItem value="Yellow Belt">Yellow Belt</SelectItem>
                  <SelectItem value="Orange Belt">Orange Belt</SelectItem>
                  <SelectItem value="Green Belt">Green Belt</SelectItem>
                  <SelectItem value="Blue Belt">Blue Belt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="levelId">Level</Label>
                <Input id="levelId" value={levelId} onChange={(e) => setLevelId(e.target.value)} placeholder="e.g., 5" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="projectId">Project ID</Label>
                <Input id="projectId" value={projectId} onChange={(e) => setProjectId(e.target.value)} placeholder="e.g., 144" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="concepts">Concepts</Label>
            <Textarea id="concepts" value={concepts} onChange={(e) => setConcepts(e.target.value)} placeholder="e.g., Loops and Game Design" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="goal1Completed" checked={goal1Completed} onCheckedChange={(checked) => setGoal1Completed(!!checked)} />
              <Label htmlFor="goal1Completed">Goal 1 Completed Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="goal2Completed" checked={goal2Completed} onCheckedChange={(checked) => setGoal2Completed(!!checked)} />
              <Label htmlFor="goal2Completed">Goal 2 Completed Today</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstGoalNext">First Goal Next Class</Label>
            <Input id="firstGoalNext" value={firstGoalNext} onChange={(e) => setFirstGoalNext(e.target.value)} placeholder="e.g., Start the next project in the curriculum." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondGoalNext">Second Goal Next Class</Label>
            <Input id="secondGoalNext" value={secondGoalNext} onChange={(e) => setSecondGoalNext(e.target.value)} placeholder="e.g., Review nested loops." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senseiNotes">Sensei Notes</Label>
            <Textarea id="senseiNotes" value={senseiNotes} onChange={(e) => setSenseiNotes(e.target.value)} placeholder="e.g., Logan did an excellent job..." />
          </div>
          <Button type="submit" disabled={mutation.isPending}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
