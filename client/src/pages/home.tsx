import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { DataEntryTable } from "@/components/data-entry-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, ChartLine, Clock, MessageCircleQuestion, Download, Trash2 } from "lucide-react";
import type { GoalEntry } from "@shared/schema";
import { goalStorageUtility } from "@/lib/localStorage"; // Renamed to avoid conflict with global localStorage

export default function Home() {
  const { toast, dismiss } = useToast();
  const [isSenseiNameExpired, setIsSenseiNameExpired] = useState(false);
  const [savedSenseiName, setSavedSenseiName] = useState("");

  useEffect(() => {
    const senseiNameData = localStorage.getItem('savedSenseiName');
    if (senseiNameData) {
      try {
        const { name } = JSON.parse(senseiNameData);
        if (name) {
          setSavedSenseiName(name);
        }
      } catch (error) {
        setSavedSenseiName(senseiNameData);
      }
    }
  }, []);

  useEffect(() => {
    const senseiNameData = localStorage.getItem('savedSenseiName');
    if (senseiNameData) {
      try {
        const { name, timestamp } = JSON.parse(senseiNameData);
        if (!name || (new Date().getTime() - timestamp > 24 * 60 * 60 * 1000)) {
          setIsSenseiNameExpired(true);
          toast({
            title: "Sensei name needs an update!",
            description: "Please update the Sensei name to continue adding entries.",
            variant: "destructive",
            persistent: true,
          });
        } else {
          setIsSenseiNameExpired(false);
        }
      } catch (error) {
        toast({
          title: "Sensei name format is outdated",
          description: "Please re-save the Sensei name to enable expiration tracking.",
          variant: "default",
          persistent: true,
        });
      }
    } else {
      setIsSenseiNameExpired(true);
      toast({
        title: "Sensei name not set!",
        description: "Please set a Sensei name to start adding entries.",
        variant: "destructive",
        persistent: true,
      });
    }
  }, [toast, savedSenseiName]);

  const handleSenseiNameChange = (name: string) => {
    const senseiNameData = {
      name,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem('savedSenseiName', JSON.stringify(senseiNameData));
    setSavedSenseiName(name);
    setIsSenseiNameExpired(false);
    dismiss();
    toast({
      title: "Success",
      description: "Sensei name saved!",
    });
  };

  // Fetch goal entries from local storage
  const { data: entries = [], isLoading } = useQuery<GoalEntry[]>({
    queryKey: ['goalEntries'],
    queryFn: () => goalStorageUtility.getGoalEntries(),
  });

  // Clear all entries mutation
  const clearAllMutation = useMutation({
    mutationFn: async () => {
      await goalStorageUtility.clearAllGoalEntries();
      localStorage.removeItem('savedSenseiName');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goalEntries'] });
      setSavedSenseiName("");
      toast({
        title: "Success",
        description: "All entries and Sensei name cleared successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear entries",
        variant: "destructive",
      });
    },
  });

  // Export to CSV
  const handleExport = () => {
    if (entries.length === 0) {
      toast({
        title: "No Data",
        description: "No entries to export",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Date', 'Sensei Name', 'Ninja Name', 'Current Project', 'Description', 'Goal 1', 'Goal 2', "Today's tracked CNWKoin"];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.date,
        entry.senseiName,
        entry.ninjaName,
        entry.currentProject,
        entry.description,
        entry.goal1,
        entry.goal2,
        entry.cnwKoin
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `goal-entries-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Data exported successfully",
    });
  };

  const handleClearAll = () => {
    if (entries.length === 0) {
      toast({
        title: "No Data",
        description: "No entries to clear",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm('Are you sure you want to clear all entries? This action cannot be undone.')) {
      clearAllMutation.mutate();
    }
  };

  // Calculate statistics
  const stats = {
    totalEntries: entries.length,
    completed: entries.filter(entry => !entry.currentProject.startsWith('Half of')).length,
    inProgress: entries.filter(entry => entry.currentProject.startsWith('Half of')).length,
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={entries.length === 0}
                data-testid="button-export"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearAll}
                disabled={entries.length === 0 || clearAllMutation.isPending}
                data-testid="button-clear-all"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Entry Table */}
        <DataEntryTable
          entries={entries}
          isLoading={isLoading}
          isSenseiNameExpired={isSenseiNameExpired}
          savedSenseiName={savedSenseiName}
          onSenseiNameChange={handleSenseiNameChange}
        />

        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="text-2xl text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Entries</p>
                  <p className="text-2xl font-semibold text-foreground" data-testid="text-total-entries">
                    {stats.totalEntries}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartLine className="text-2xl text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Completed Projects</p>
                  <p className="text-2xl font-semibold text-foreground" data-testid="text-completed">
                    {stats.completed}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="text-2xl text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-semibold text-foreground" data-testid="text-in-progress">
                    {stats.inProgress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              <MessageCircleQuestion className="inline mr-2" />
              How it works
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Project Status Mapping:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <strong>Just started:</strong> Goal 1: Half of current, Goal 2: Finish current</li>
                  <li>• <strong>Half-way:</strong> Goal 1: Finish current, Goal 2: Half of next project</li>
                  <li>• <strong>Finished:</strong> Goal 1: Finish half of next-project, Goal 2: Finish next-project</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Features:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Auto-fill today's date</li>
                  <li>• Automatic goal generation</li>
                  <li>• Copy formatted strings</li>
                  <li>• Data persistence</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Tips:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Use the copy button to share progress</li>
                  <li>• Export data for external use</li>
                  <li>• Data is saved automatically</li>
                  <li>• Responsive design works on mobile</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      
      
      {/* Patch Notes Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Patch Notes: Pre-September 16, 2025
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-foreground">📝 Data Management & Editing</h4>
                <h5 className="font-medium text-foreground mt-2">September 16, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Edit and Copy Functionality: Added the ability to <strong>edit and copy</strong> entries, improving user productivity and data management. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/728daecf51ba12da085741c662b45da227c2c12f" target="_blank" rel="noopener noreferrer">728daec</a>)</li>
                </ul>
                <h5 className="font-medium text-foreground mt-2">September 3, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Project Naming Clarification: Refined project naming logic to avoid ambiguity and ensure consistency. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/bacbcc20075f728171b49f7d4b3d3136c519f0b0" target="_blank" rel="noopener noreferrer">bacbcc2</a>)</li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-foreground">🔧 Error Handling & Usability</h4>
                <h5 className="font-medium text-foreground mt-2">September 16, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Button Press Interaction: Enhanced button press interactions for better usability and responsiveness. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/74418802a6f1a70decc514d24e49cc54651ae9d8" target="_blank" rel="noopener noreferrer">7441880</a>)</li>
                </ul>
                <h5 className="font-medium text-foreground mt-2">September 3, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Error Handling: Improved validation and feedback for data entry, reducing user errors. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/aca71411f20946b4b0e5ced1471ed6a2ff14c1a1" target="_blank" rel="noopener noreferrer">aca7141</a>)</li>
                  <li>Sticky Action Column: Made the <strong>Action column sticky</strong> for easier access to edit, delete, and copy functions, especially on large datasets. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/7d347d17ff60550055b56b3eb3538870fd76255b" target="_blank" rel="noopener noreferrer">7d347d1</a>)</li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-foreground">📊 Progress Tracking & Counters</h4>
                <h5 className="font-medium text-foreground mt-2">September 3, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Counter Tool: Added <strong>stats tracking</strong> for `totalEntries`, `completed`, and `inProgress` to help users monitor progress at a glance. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/aca71411f20946b4b0e5ced1471ed6a2ff14c1a1" target="_blank" rel="noopener noreferrer">aca7141</a>)</li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-foreground">📱 UI/UX Improvements</h4>
                <h5 className="font-medium text-foreground mt-2">September 16, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Key-Press Improvement: Enhanced the responsiveness and usability of key-press interactions. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/e2515c4a6304247a151b6ccd608d35922a2c64e3" target="_blank" rel="noopener noreferrer">e2515c4</a>)</li>
                </ul>
                <h5 className="font-medium text-foreground mt-2">September 3, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Mobile & iPad Optimization: Adjusted layouts for better fit and usability on mobile and tablet devices. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/8b8a9e5abac8d6b6c4934f6f10e959529a9eb733" target="_blank" rel="noopener noreferrer">8b8a9e5</a>)</li>
                  <li>Title Clarity: Updated titles and labels for better readability and consistency. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/ece2d6e5a151dada6fe525f6ababebe2bfa7c3c1" target="_blank" rel="noopener noreferrer">ece2d6e</a>)</li>
                </ul>
                <h5 className="font-medium text-foreground mt-2">August 30, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>All Projects Support: Expanded the app to track <strong>all projects</strong>, ensuring comprehensive goal management. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/9927cb7fc8e88bac38067bdff0434f077185ed0d" target="_blank" rel="noopener noreferrer">9927cb7</a>)</li>
                </ul>
                <h5 className="font-medium text-foreground mt-2">August 28, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Client-Side Storage: Implemented <strong>local storage</strong> to save and retrieve user data without server dependency. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/6722054d46459a369a29b844d15ad00d243cb191" target="_blank" rel="noopener noreferrer">6722054</a>)</li>
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-foreground">📂 Schema & Structure</h4>
                <h5 className="font-medium text-foreground mt-2">September 3, 2025</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Schema Updates: Added `halfwaypoints` and refined field widths for better data organization. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/5a61c71cd1d3ff50de741b05a67ace3bea048c78" target="_blank" rel="noopener noreferrer">5a61c71</a>)</li>
                  <li>Project Status Options: Corrected and expanded status options for accurate tracking. (<a href="https://github.com/richard523/cnwk-goal-tracker/commit/97e9f7a392c592be50fbfe0f27aaffca1fb2feb4" target="_blank" rel="noopener noreferrer">97e9f7a</a>)</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              These updates focused on <strong>enhancing editing capabilities, clarifying project naming, improving error handling, expanding copy functions, and introducing a counter tool</strong>—all while ensuring a seamless user experience. The dates are now accurate and reflect the actual commit history.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
