import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SubmitProgressForm } from "@/components/submit-progress-form";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";
import { ProgressReportTable, type ProgressReportEntry } from "@/components/progress-report-table";

const PROGRESS_ENTRIES_STORAGE_KEY = "progress_entries";

const createDefaultEntries = (): ProgressReportEntry[] => [
  {
    id: crypto.randomUUID(),
    senseiName: 'Joshua',
    studentName: 'Logan Yao',
    studentId: '461',
    belt: 'Yellow Belt',
    level: '5',
    projectId: '144',
    concepts: 'Loops and Game Design',
    goal1Completed: true,
    goal2Completed: true,
    firstGoalNextClass: 'Start the next project in the curriculum.',
    secondGoalNextClass: 'Review nested loops.',
    senseiNotes: 'Logan did an excellent job implementing the spooky effects and understood how to change sprite images based on events.'
  }
];

const loadProgressEntries = (): ProgressReportEntry[] => {
  try {
    const stored = localStorage.getItem(PROGRESS_ENTRIES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ProgressReportEntry[];
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load progress entries from localStorage", e);
  }
  return createDefaultEntries();
};

const saveProgressEntries = (entries: ProgressReportEntry[]) => {
  try {
    localStorage.setItem(PROGRESS_ENTRIES_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Failed to save progress entries to localStorage", e);
  }
};

export default function Home() {
  const { toast, dismiss } = useToast();
  const [progressEntries, setProgressEntries] = useState<ProgressReportEntry[]>(() => loadProgressEntries());

  // Save to localStorage whenever entries change
  useEffect(() => {
    saveProgressEntries(progressEntries);
  }, [progressEntries]);

  const handleEntryAdd = (entry: ProgressReportEntry) => {
    setProgressEntries([entry, ...progressEntries]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').slice(1); // Skip header
        const newEntries: ProgressReportEntry[] = lines.map(line => {
          const [senseiName, studentName, studentId, belt, level, projectId, concepts, goal1Completed, goal2Completed, firstGoalNextClass, secondGoalNextClass, senseiNotes] = line.split(',');
          return {
            id: crypto.randomUUID(),
            senseiName,
            studentName,
            studentId,
            belt,
            level,
            projectId,
            concepts,
            goal1Completed: goal1Completed === 'true',
            goal2Completed: goal2Completed === 'true',
            firstGoalNextClass,
            secondGoalNextClass,
            senseiNotes
          };
        });
        setProgressEntries(newEntries);
        saveProgressEntries(newEntries);
        toast({ title: 'Success', description: 'CSV data loaded successfully' });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="text-primary-foreground text-sm" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">CNWK Project Goal Tracker by richard and LLMs</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Report Table */}
        <ProgressReportTable entries={progressEntries} onEntriesChange={setProgressEntries} />

        {/* Submit Progress Form */}
        <div className="mt-8">
          <SubmitProgressForm entries={progressEntries} onEntryAdd={handleEntryAdd} />
        </div>
      </main>
    </div>
  );
}
