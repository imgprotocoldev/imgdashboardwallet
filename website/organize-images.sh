#!/bin/bash

echo "🗂️  Organizing images into correct folders..."

cd /home/van/imgdashboard/website/public

# LOGOS - Brand logos
echo "📁 Moving brand logos..."
mv imgtextlogo.webp logos/
mv imglogoround.png logos/
if [ -f "imglogo.png" ]; then
    mv imglogo.png logos/
fi
echo "✅ Brand logos moved to /logos/"

# ICONS - Navigation and UI icons
echo "📁 Moving navigation icons..."
mv dashboard.png icons/
mv calendar.png icons/ 2>/dev/null || echo "calendar.png not found"
mv harvesting.png icons/
mv distribution.png icons/
mv pools.png icons/
mv calculator.png icons/
mv vote.png icons/
mv shield.png icons/
mv refresh.png icons/
mv external-link.png icons/
mv left-arrow.png icons/
mv right-arrow.png icons/
echo "✅ Navigation icons moved to /icons/"

# SOCIAL - Social media icons
echo "📁 Moving social media icons..."
mv telegram.png social/
mv twitter.png social/
mv discordtab.png social/
mv homepage.png social/
echo "✅ Social media icons moved to /social/"

# TOKENS - Cryptocurrency/token logos
echo "📁 Moving token logos..."
mv solanalogo.png tokens/
mv bonklogo.png tokens/
mv usdclogo.png tokens/
mv radiumlogo.png tokens/
mv orcalogo.png tokens/
echo "✅ Token logos moved to /tokens/"

# UPDATES - Update announcement images
echo "📁 Moving update images..."
mv Imgupdate*.png updates/ 2>/dev/null || echo "Update images not found or already moved"
echo "✅ Update images moved to /updates/"

# NOTE: Event images - Move image files that exist
echo "📁 Checking for event images..."
# These might not exist in the current set, but if they do:
for event_img in kimbosponsor.jpg imggiveaway.jpg trackimgcoingecko.jpg newrewardsevent.jpg bitruelisting.jpg alphailistingbanner.jpg; do
    if [ -f "$event_img" ]; then
        mv "$event_img" event-images/
        echo "✅ Moved $event_img to /event-images/"
    fi
done

# ASSETS - Miscellaneous assets
echo "📁 Moving miscellaneous assets..."
mv burgermenu.png assets/
mv IMGroadmap2025.png assets/
mv lottery.png assets/
mv wallet.png assets/
mv stocktwits.png assets/
mv phantom.svg assets/
mv solflare.svg assets/
mv logo.svg assets/
mv rewardsnapshot.png assets/ 2>/dev/null || echo "rewardsnapshot.png not found"

# Handle Zone.Identifier files (Windows artifacts)
find . -name "*:Zone.Identifier" -type f -delete
echo "✅ Removed Zone.Identifier files"

echo ""
echo "🎯 ORGANIZATION COMPLETE!"
echo ""
echo "📂 Final Structure:"
echo "├── logos/ (Brand logos)"
echo "├── icons/ (Navigation & UI)"
echo "├── social/ (Social media)"
echo "├── tokens/ (Crypto tokens)"
echo "├── updates/ (Announcements)"
echo "├── event-images/ (Events)"
echo "└── assets/ (Misc files)"
echo ""
echo "✅ Ready for Filezilla deployment!"
