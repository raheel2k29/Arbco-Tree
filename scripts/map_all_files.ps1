Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxFiles = Get-ChildItem -Path "Arbco Service Pages Changes" -Filter "*.docx"
$results = @()

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
            
            # Simple regex to get Page URL
            $urlMatch = [regex]::Match($xml, 'https://www\.arbco\.com\.au/service-areas/([a-zA-Z0-9\-_]+)')
            $pageUrl = if ($urlMatch.Success) { $urlMatch.Value } else { "NOT_FOUND" }
            $slug = if ($urlMatch.Success) { $urlMatch.Groups[1].Value } else { "NOT_FOUND" }
            
            # Match SEO Title if present
            $titleMatch = [regex]::Match($xml, 'SEO Title:[\s\S]*?<w:t[^>]*>([^<]+)</w:t>')
            
            $results += [PSCustomObject]@{
                FileName = $file.Name
                Slug = $slug
                PageUrl = $pageUrl
            }
        }
        $zip.Dispose()
    } catch {
        $results += [PSCustomObject]@{
            FileName = $file.Name
            Slug = "ERROR"
            PageUrl = $_.Exception.Message
        }
    }
}

$results | Format-Table -AutoSize
$results | Export-Csv -Path "scripts/files_to_slugs.csv" -NoTypeInformation
Write-Host "Total scanned: $($results.Count)"
