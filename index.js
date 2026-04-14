const core = require("@actions/core");
const crypto = require("crypto");

async function run() {
  try {
    const text = core.getInput("text", { required: true });
    const operation = core.getInput("operation", { required: true }).toLowerCase();

    let result;

    switch (operation) {
      case "regex_replace": {
        const find = core.getInput("find");
        const replace = core.getInput("replace");
        const flags = core.getInput("flags") || "g";
        if (!find) throw new Error("'find' input is required for regex_replace");
        const regex = new RegExp(find, flags);
        result = text.replace(regex, replace);
        break;
      }
      case "base64_encode":
        result = Buffer.from(text).toString("base64");
        break;
      case "base64_decode":
        result = Buffer.from(text, "base64").toString("utf-8");
        break;
      case "url_encode":
        result = encodeURIComponent(text);
        break;
      case "url_decode":
        result = decodeURIComponent(text);
        break;
      case "uppercase":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "trim":
        result = text.trim();
        break;
      case "substring": {
        const start = parseInt(core.getInput("start") || "0", 10);
        const endStr = core.getInput("end");
        const end = endStr ? parseInt(endStr, 10) : undefined;
        result = text.substring(start, end);
        break;
      }
      case "split": {
        const delimiter = core.getInput("delimiter") || ",";
        const indexStr = core.getInput("index");
        const parts = text.split(delimiter);
        if (indexStr !== "") {
          const idx = parseInt(indexStr, 10);
          result = idx >= 0 && idx < parts.length ? parts[idx] : "";
        } else {
          result = JSON.stringify(parts);
        }
        break;
      }
      case "reverse":
        result = text.split("").reverse().join("");
        break;
      case "length":
        result = String(text.length);
        break;
      case "lines":
        result = String(text.split(/\r?\n/).length);
        break;
      case "hash_sha256":
        result = crypto.createHash("sha256").update(text).digest("hex");
        break;
      default:
        throw new Error(`Unknown operation: ${operation}. Supported: regex_replace, base64_encode, base64_decode, url_encode, url_decode, uppercase, lowercase, trim, substring, split, reverse, length, lines, hash_sha256`);
    }

    core.setOutput("result", result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
