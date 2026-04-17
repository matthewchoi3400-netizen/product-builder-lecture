import os
import re

files = [
    "index.html",
    "post-ai-technology.html",
    "about.html",
    "privacy.html",
    "post-probability-math.html",
    "post-digital-privacy.html",
    "post-digital-nomad.html",
    "post-collaboration-tools.html",
    "post-2026-ai-trends.html",
    "post-sms-marketing.html",
    "post-seo-strategy.html",
    "post-ai-voice-ars.html"
]

gtag = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HH56L4PS40"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HH56L4PS40');
</script>"""

for file_path in files:
    full_path = os.path.join("/home/user/productbuilder-week1", file_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove the messed up insertion
        messed_up_pattern = r'\\1\\n' + re.escape(gtag)
        fixed_content = re.sub(messed_up_pattern, '', content)
        
        # Proper insertion
        head_pattern = re.compile(r'(<head\b[^>]*>)', re.IGNORECASE)
        # We need to make sure we don't double add it if I try to re-run
        # But for now, let's just fix what I broke.
        # Actually, let's just do a clean replacement.
        
        # My previous script messed up the <head> tag too? 
        # Let's check the output again. 
        # It says "\1\n<!-- Google tag (gtag.js) -->"
        # It seems it didn't match <head> correctly in the replacement or it didn't keep it.
        
        # Let's try to find the messed up part and replace it with <head>\n<gtag>
        messed_up_content = "\\1\\n" + gtag
        if messed_up_content in fixed_content:
             # This means the <head> tag itself was replaced by \1\n...
             # Actually I should just revert or use a more careful regex.
             pass

        # Let's just do a simple string search and replace if we know what happened.
        # It seems <head> was replaced by \1\n<!-- Google tag...
        # So I need to put <head> back.
        
        # Better yet, let's find where it is and fix it.
        # I'll use a more direct approach.
