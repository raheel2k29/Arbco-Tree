Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxFiles = Get-ChildItem -Path "Arbco Service Pages Changes" -Filter "*.docx"
$shortList = @()
$compList = @()

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
            
            # Simple text conversion
            $plain = [regex]::Replace($xml, '<w:p[^>]*>', "`n")
            $plain = [regex]::Replace($plain, '<[^>]+>', '')
            $plain = [System.Net.WebUtility]::HtmlDecode($plain)
            
            $urlMatch = [regex]::Match($plain, 'https://www\.arbco\.com\.au/service-areas/([a-zA-Z0-9\-_]+)')
            $slug = if ($urlMatch.Success) { $urlMatch.Groups[1].Value } else { "UNKNOWN" }
            
            $headings = [regex]::Matches($plain, '(?m)^\s*\d+\.\s+[A-Z].*$')
            
            if ($headings.Count -le 10) {
                $shortList += [PSCustomObject]@{ File = $file.Name; Slug = $slug; Count = $headings.Count }
            } else {
                $compList += [PSCustomObject]@{ File = $file.Name; Slug = $slug; Count = $headings.Count }
            }
        }
        $zip.Dispose()
    } catch {
        Write-Host "Error reading $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "Short format (<= 10 sections): $($shortList.Count)"
$shortList | Format-Table -AutoSize
Write-Host "Comprehensive format (> 10 sections): $($compList.Count)"
$compList | Select-Object -First 10 | Format-Table -AutoSize
