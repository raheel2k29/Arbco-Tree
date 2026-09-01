import os

page_path = 'src/app/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page_content = f.read()

# Extract Top Banner + Header
header_start = page_content.find('{/* Top Banner (Marquee) */}')
header_end = page_content.find('</header>') + len('</header>')
header_code = page_content[header_start:header_end]

# Extract Footer
footer_start = page_content.find('{/* Universal Footer Block */}')
if footer_start == -1:
    footer_start = page_content.find('<footer')
footer_end = page_content.find('</footer>') + len('</footer>')
footer_code = page_content[footer_start:footer_end]

# Create Header.tsx
header_component = f"""import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {{
  return (
    <>
      {header_code}
    </>
  );
}}
"""
with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(header_component)

# Create Footer.tsx
footer_component = f"""import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {{
  return (
    <>
      {footer_code}
    </>
  );
}}
"""
with open('src/components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(footer_component)

# Remove Header and Footer from page.tsx
new_page_content = page_content[:header_start] + page_content[header_end:]
new_page_content = new_page_content[:new_page_content.find(footer_code)] + new_page_content[new_page_content.find(footer_code)+len(footer_code):]

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(new_page_content)

print("Extraction successful.")
