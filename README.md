# TransformText GitHub Action

Transform text with regex replace, base64 encode/decode, URL encode/decode, case conversion, SHA-256 hashing, and more. Zero dependencies beyond `@actions/core`.

## Inputs

| Input       | Required | Default | Description |
|-------------|----------|---------|-------------|
| `text`      | **Yes**  | —       | Input text to transform |
| `operation` | **Yes**  | —       | Transformation to apply (see operations below) |
| `find`      | No       | —       | Regex pattern (for `regex_replace`) |
| `replace`   | No       | —       | Replacement string with `$1`, `$2` groups (for `regex_replace`) |
| `flags`     | No       | `g`     | Regex flags (for `regex_replace`) |
| `start`     | No       | `0`     | Start index (for `substring`) |
| `end`       | No       | —       | End index (for `substring`) |
| `delimiter` | No       | `,`     | Delimiter (for `split`) |
| `index`     | No       | —       | Element index (for `split`) |

## Operations

| Operation       | Description |
|-----------------|-------------|
| `regex_replace` | Find and replace using regex with capture groups |
| `base64_encode` | Encode text to base64 |
| `base64_decode` | Decode base64 to text |
| `url_encode`    | URL encode (percent-encoding) |
| `url_decode`    | URL decode |
| `uppercase`     | Convert to UPPERCASE |
| `lowercase`     | Convert to lowercase |
| `trim`          | Remove leading/trailing whitespace |
| `substring`     | Extract substring by index |
| `split`         | Split by delimiter, return all or specific index |
| `reverse`       | Reverse the string |
| `length`        | Get string length |
| `lines`         | Count number of lines |
| `hash_sha256`   | SHA-256 hash of the text |

## Output

| Output   | Description |
|----------|-------------|
| `result` | The transformed text |

## Examples

### Regex replace

```yaml
- uses: skgandikota/TransformText@v1
  id: transform
  with:
    text: "Hello World 2026"
    operation: "regex_replace"
    find: "(\\w+) (\\w+)"
    replace: "$2 $1"

# result: "World Hello 2026"
```

### Base64 encode an API key for headers

```yaml
- uses: skgandikota/TransformText@v1
  id: encode
  with:
    text: "${{ secrets.API_USER }}:${{ secrets.API_PASS }}"
    operation: "base64_encode"

- uses: skgandikota/FetchUrl@v2
  with:
    url: "https://api.example.com/data"
    headers: '{"Authorization": "Basic ${{ steps.encode.outputs.result }}"}'
```

### Extract domain from URL

```yaml
- uses: skgandikota/TransformText@v1
  id: domain
  with:
    text: "https://api.example.com/v2/users"
    operation: "regex_replace"
    find: "https?://([^/]+).*"
    replace: "$1"

# result: "api.example.com"
```

## License

MIT
