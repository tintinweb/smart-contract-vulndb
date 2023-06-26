import * as fs from "fs";

/** typedef */
enum Severity {
  Critical = "critical",
  Major = "major",
  Medium = "medium",
  Minor = "minor",
  Info = "info",
  Null = "null",
  Undefined = "undefined",
}

interface Issue {
  title: string;
  severity: Severity;
  body: string;
  dataSource: DataSource;
}

interface DataSource {
  name: string;
  repo: string;
  url: string;
}

class VulnDb {
  issues: Issue[];

  constructor(data) {
    this.issues = data
      .split("\n")
      .filter((l) => l.trim().length > 0)
      .map((l) => JSON.parse(l) as Issue);
  }
}

/** Example */
async function main() {
  const db = new VulnDb(fs.readFileSync("../../dataset/vulns.json", "utf-8"));

  console.log(`total issues: ${db.issues.length}`);
}

main();
