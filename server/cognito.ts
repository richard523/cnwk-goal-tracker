// server/cognito.ts
import * as https from 'https';
import * as dotenv from 'dotenv';

dotenv.config();

// ===================================================================================
// INTERFACES
// ===================================================================================

export interface ProgressReportSubmission {
  SenseisName: 'Eniola' | 'Jessica' | 'Joshua' | 'Kareem' | 'Kristen' | 'Richard' | 'Sebastian' | 'Taybor' | 'Yao';
  Name: {
    Id: string; // Just the entry number, e.g., "461"
    Label: string; // Student's full name, e.g., "Logan Yao"
  };
  Belt: 'White Belt' | 'Yellow Belt' | 'Orange Belt' | 'Green Belt' | 'Blue Belt';
  Level: {
    Id: string; // Just the level number, e.g., "5"
    Label: string; // Same as Id, e.g., "5"
  };
  Concepts?: string;
  ProjectWorkedOn?: {
    Id: string; // Just the project number, e.g., "150"
    Label: string; // Project name, e.g., "Underwater Food Chain"
  };
  ConceptsLearned?: string;
  KeyFunctions?: string;
  CompletedGoal1Today?: boolean;
  CompletedGoal2Today?: boolean;
  FirstGoalNextClass?: string;
  SecondGoalNextClass?: string;
  SenseiNotes?: string;
}


// ===================================================================================
// API HELPER FUNCTIONS
// ===================================================================================

async function getEntry(formId: string, entryId: string): Promise<any> {
  const apiKey = process.env.COGNITO_API_KEY;
  if (!apiKey) {
    throw new Error('COGNITO_API_KEY environment variable is not set');
  }

  const options = {
    hostname: 'www.cognitoforms.com',
    port: 443,
    path: `/api/forms/${formId}/entries/${entryId}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            reject(new Error('Failed to parse JSON response from getEntry.'));
          }
        } else {
          reject(new Error(`[getEntry] HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.end();
  });
}

async function submitProgressReport(data: ProgressReportSubmission): Promise<any> {
  const apiKey = process.env.COGNITO_API_KEY;
  if (!apiKey) {
    throw new Error('COGNITO_API_KEY environment variable is not set');
  }

  const formId = '132'; // The Progress Report Form ID
  const postData = JSON.stringify(data);

  const options = {
    hostname: 'www.cognitoforms.com',
    port: 443,
    path: `/api/forms/${formId}/entries`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            reject(new Error('Failed to parse JSON response from submitProgressReport.'));
          }
        } else {
          reject(new Error(`[submitProgressReport] HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => reject(error));
    req.write(postData);
    req.end();
  });
}

function createSubmissionPayload(
  senseiName: string,
  studentId: string,
  studentName: string,
  belt: string,
  levelId: string,
  options: {
    concepts?: string;
    projectData?: { // This object will hold the looked-up data
      projectId: string;
      projectName: string;
      conceptsLearned: string;
      keyFunctions: string;
    };
    goal1Completed?: boolean;
    goal2Completed?: boolean;
    firstGoalNext?: string;
    secondGoalNext?: string;
    senseiNotes?: string;
  } = {}
): ProgressReportSubmission {
  const submission: ProgressReportSubmission = {
    SenseisName: senseiName as any,
    Name: { Id: studentId, Label: studentName },
    Belt: belt as any,
    Level: { Id: levelId, Label: levelId }
  };

  if (options.concepts) submission.Concepts = options.concepts;
  if (options.projectData) {
    submission.ProjectWorkedOn = {
      Id: options.projectData.projectId,
      Label: options.projectData.projectName
    };
    submission.ConceptsLearned = options.projectData.conceptsLearned;
    submission.KeyFunctions = options.projectData.keyFunctions;
  }
  if (options.goal1Completed !== undefined) submission.CompletedGoal1Today = options.goal1Completed;
  if (options.goal2Completed !== undefined) submission.CompletedGoal2Today = options.goal2Completed;
  if (options.firstGoalNext) submission.FirstGoalNextClass = options.firstGoalNext;
  if (options.secondGoalNext) submission.SecondGoalNextClass = options.secondGoalNext;
  if (options.senseiNotes) submission.SenseiNotes = options.senseiNotes;

  return submission;
}

export async function handleProgressSubmission(submissionData: any) {
    const {
        SENSEI_NAME,
        STUDENT_ID,
        STUDENT_NAME,
        BELT,
        LEVEL_ID,
        PROJECT_ID_TO_LOOKUP,
        OTHER_DETAILS
    } = submissionData;

    const PROJECTS_FORM_ID = '140';
    console.log(`🔎 Looking up details for Project ID ${PROJECT_ID_TO_LOOKUP} from Form ${PROJECTS_FORM_ID}...`);

    const project = await getEntry(PROJECTS_FORM_ID, PROJECT_ID_TO_LOOKUP);
    console.log(`👍 Found Project: "${project.Project}"`);

    const lookedUpProjectData = {
        projectId: project.Entry.Number.toString(),
        projectName: project.Project,
        conceptsLearned: project.Concepts,
        keyFunctions: project.KeyBlocksAndFunctions
    };

    console.log("📝 Preparing submission payload...");
    const payload = createSubmissionPayload(
      SENSEI_NAME,
      STUDENT_ID,
      STUDENT_NAME,
      BELT,
      LEVEL_ID,
      {
        ...OTHER_DETAILS,
        projectData: lookedUpProjectData
      }
    );
    
    console.log('📡 Submitting progress report...');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const result = await submitProgressReport(payload);
    console.log('\n✅ Submission successful!');
    console.log(`Entry Number: ${result.Entry.Number}`);
    console.log(`Admin Link: ${result.Entry.AdminLink}`);
    return result;
}
