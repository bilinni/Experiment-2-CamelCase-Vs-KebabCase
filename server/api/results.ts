import { MongoClient } from "mongodb";
import { createObjectCsvStringifier } from "csv-writer";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  const client = await MongoClient.connect(config.mongoUri, {
  });

  try {
    const db = client.db(config.mongoDb);
    const collection = db.collection("results");

    const results = await collection.find({}).toArray();

    if (results.length === 0) {
      throw new Error("No data found in the results collection.");
    }

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: "user.age", title: "Age" },
        { id: "user.experience", title: "Experience" },
        { id: "user.preferredStyle", title: "Preferred Style" },
        { id: "task", title: "Task" },
        { id: "selected", title: "Selected Answer" },
        { id: "correct", title: "Correct" },
        { id: "timeTaken", title: "Time Taken (ms)" },
        { id: "timestamp", title: "Submission Timestamp" },
      ],
    });

    const csvRows = results.flatMap((result) =>
      result.answers.map((answer: any) => ({
        "user.age": result.user.age,
        "user.experience": result.user.experience,
        "user.preferredStyle": result.user.preferredStyle,
        task: answer.task,
        selected: answer.selected,
        correct: answer.correct,
        timeTaken: answer.timeTaken,
        timestamp: result.metadata.timestamp,
      }))
    );

    const csvContent = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(csvRows);

    event.node.res.setHeader("Content-Type", "text/csv");
    event.node.res.setHeader("Content-Disposition", 'attachment; filename="results.csv"');

    return csvContent;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching results or creating CSV:", error.message);
    } else {
      console.error("Error fetching results or creating CSV:", error);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await client.close();
  }
});
