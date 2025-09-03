import { useState } from "react";
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
  const { toast } = useToast();

  // Fetch goal entries from local storage
  const { data: entries = [], isLoading } = useQuery<GoalEntry[]>({
    queryKey: ['goalEntries'],
    queryFn: () => goalStorageUtility.getGoalEntries(),
  });

  // Clear all entries mutation
  const clearAllMutation = useMutation({
    mutationFn: () => goalStorageUtility.clearAllGoalEntries(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goalEntries'] });
      toast({
        title: "Success",
        description: "All entries cleared successfully",
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

    const headers = ['Date', 'Sensei Name', 'Ninja Name', 'Current Project', 'Description', 'Goal 1', 'Goal 2'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.date,
        entry.senseiName,
        entry.ninjaName,
        entry.currentProject,
        entry.description,
        entry.goal1,
        entry.goal2
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
              <h1 className="text-xl font-semibold text-foreground">Project Goal Tracker</h1>
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
        <DataEntryTable entries={entries} isLoading={isLoading} />

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
      </main>
    </div>
  );
}
