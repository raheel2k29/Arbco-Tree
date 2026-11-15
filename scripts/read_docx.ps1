Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($args[0])
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

# Strip tags and format paragraphs
$text = $content -replace '<w:p[^>]*>', "`n" -replace '<[^>]+>', ''
[System.Net.WebUtility]::HtmlDecode($text)
