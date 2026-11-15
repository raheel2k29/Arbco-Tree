Add-Type -AssemblyName System.IO.Compression.FileSystem

$outDir = "scripts/extracted_texts"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

$docxFiles = Get-ChildItem -Path "Arbco Service Pages Changes" -Filter "*.docx"
$manifest = @()

foreach ($file in $docxFiles) {
    try {
        $zip = [System.IO.Compression.ZipFile]::OpenRead($file.FullName)
        $entry = $zip.GetEntry("word/document.xml")
        if ($entry) {
            $stream = $entry.Open()
            $reader = New-Object System.IO.StreamReader($stream)
            $xml = $reader.ReadToEnd()
            $reader.Close()
            $stream.Close()
            
            # Convert Word XML paragraphs into newlines
            $text = [regex]::Replace($xml, '<w:p[^>]*>', "`n")
            $text = [regex]::Replace($text, '<[^>]+>', '')
            $text = [System.Net.WebUtility]::HtmlDecode($text)
            
            # Find slug
            $urlMatch = [regex]::Match($text, 'https://www\.arbco\.com\.au/service-areas/([a-zA-Z0-9\-_]+)')
            $slug = if ($urlMatch.Success) { $urlMatch.Groups[1].Value } else { "UNKNOWN" }
            
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
            $outPath = Join-Path $outDir "$baseName.txt"
            
            [System.IO.File]::WriteAllText($outPath, $text, [System.Text.Encoding]::UTF8)
            
            $manifest += [PSCustomObject]@{
                FileName = $file.Name
                Slug = $slug
                TxtFile = "$baseName.txt"
                CharLength = $text.Length
            }
        }
        $zip.Dispose()
    } catch {
        Write-Host "Error with $($file.Name): $($_.Exception.Message)"
    }
}

$manifestJson = $manifest | ConvertTo-Json -Depth 2
[System.IO.File]::WriteAllText("scripts/manifest.json", $manifestJson, [System.Text.Encoding]::UTF8)
Write-Host "Successfully extracted $($manifest.Count) docx files to UTF-8 text in $outDir"
