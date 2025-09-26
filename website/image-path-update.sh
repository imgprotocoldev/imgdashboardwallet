#!/bin/bash

# Image Path Update Script for Organized Folders

echo "Updating image paths for organized folder structure..."

# Backup
cp app.js app.js.image-backup

# Navigation Icons -> /icons/
sed -i 's|src="/dashboard\.png"|src="/icons/dashboard.png"|g' app.js
sed -i 's|src="/calendar\.png"|src="/icons/calendar.png"|g' app.js
sed -i 's|src="/harvesting\.png"|src="/icons/harvesting.png"|g' app.js
sed -i 's|src="/distribution\.png"|src="/icons/distribution.png"|g' app.js
sed -i 's|src="/pools\.png"|src="/icons/pools.png"|g' app.js
sed -i 's|src="/calculator\.png"|src="/icons/calculator.png"|g' app.js
sed -i 's|src="/vote\.png"|src="/icons/vote.png"|g' app.js
sed -i 's|src="/shield\.png"|src="/icons/shield.png"|g' app.js
sed -i 's|src="/refresh\.png"|src="/icons/refresh.png"|g' app.js
sed -i 's|src="/external-link\.png"|src="/icons/external-link.png"|g' app.js
sed -i 's|src="/left-arrow\.png"|src="/icons/left-arrow.png"|g' app.js
sed -i 's|src="/right-arrow\.png"|src="/icons/right-arrow.png"|g' app.js

# Social Icons -> /social/
sed -i 's|src="/telegram\.png"|src="/social/telegram.png"|g' app.js
sed -i 's|src="/twitter\.png"|src="/social/twitter.png"|g' app.js
sed -i 's|src="/discordtab\.png"|src="/social/discordtab.png"|g' app.js
sed -i 's|src="/homepage\.png"|src="/social/homepage.png"|g' app.js

# Token Logos -> /tokens/
sed -i 's|src="/solanalogo\.png"|src="/tokens/solanalogo.png"|g' app.js
sed -i 's|src="/bonklogo\.png"|src="/tokens/bonklogo.png"|g' app.js
sed -i 's|src="/usdclogo\.png"|src="/tokens/usdclogo.png"|g' app.js
sed -i 's|src="/radiumlogo\.png"|src="/tokens/radiumlogo.png"|g' app.js
sed -i 's|src="/orcalogo\.png"|src="/tokens/orcalogo.png"|g' app.js

# Brand Logos -> /logos/ or /tokens/ 
sed -i 's|src="/imglogoround\.png"|src="/logos/imglogoround.png"|g' app.js

# Update Images -> /updates/
sed -i 's|src="/Imgupdate1\.png"|src="/updates/Imgupdate1.png"|g' app.js
sed -i 's|src="/Imgupdate2\.png"|src="/updates/Imgupdate2.png"|g' app.js
sed -i 's|src="/Imgupdate3\.png"|src="/updates/Imgupdate3.png"|g' app.js
sed -i 's|src="/Imgupdate4\.png"|src="/updates/Imgupdate4.png"|g' app.js
sed -i 's|src="/Imgupdate5\.png"|src="/updates/Imgupdate5.png"|g' app.js
sed -i 's|src="/Imgupdate6\.png"|src="/updates/Imgupdate6.png"|g' app.js

# Event Images -> /event-images/
sed -i 's|src="/kimbosponsor\.jpg"|src="/event-images/kimbosponsor.jpg"|g' app.js
sed -i 's|src="/imggiveaway\.jpg"|src="/event-images/imggiveaway.jpg"|g' app.js
sed -i 's|src="/trackimgcoingecko\.jpg"|src="/event-images/trackimgcoingecko.jpg"|g' app.js
sed -i 's|src="/newrewardsevent\.jpg"|src="/event-images/newrewardsevent.jpg"|g' app.js
sed -i 's|src="/bitruelisting\.jpg"|src="/event-images/bitruelisting.jpg"|g' app.js
sed -i 's|src="/alphailistingbanner\.jpg"|src="/event-images/alphailistingbanner.jpg"|g' app.js

# Miscellaneous Assets -> /assets/
sed -i 's|src="/burgermenu\.png"|src="/assets/burgermenu.png"|g' app.js
sed -i 's|src="/lottery\.png"|src="/assets/lottery.png"|g' app.js
sed -i 's|src="/wallet\.png"|src="/assets/wallet.png"|g' app.js
sed -i 's|src="/stocktwits\.png"|src="/assets/stocktwits.png"|g' app.js
sed -i 's|src="/phantom\.svg"|src="/assets/phantom.svg"|g' app.js
sed -i 's|src="/solflare\.svg"|src="/assets/solflare.svg"|g' app.js

echo "✅ Image paths updated successfully!"
echo "All image references now point to organized folders."
echo "✓ Navigation icons → /icons/"
echo "✓ Social icons → /social/"
echo "✓ Token logos → /tokens/"
echo "✓ Logo files → /logos/"
echo "✓ Update images → /updates/"
echo "✓ Event images → /event-images/"
echo "✓ Assets → /assets/"
echo ""
echo "⚠️  NEXT: Update Filezilla folder structure to match these paths!"
