# odditype

odditype is a web application that functions to add some oddity to your types. You can upload your own (.otf) font or use the default Craftwork Grotesk font by Ivan Tsanko of craftwork.design. See your new typeface in action and print your personalised message or one of the ten rotating pangrams. Download your newly generated odd type as an .otf file and use it anywhere you can imagine.

The randomiser works by going over all the points of the individual glyphs and adding a random number between 0 and your given value to the coordinates. The higher the value you pick, the more discrepancy there will be between the points and thus the more randomness. Going into the negatives will result in weird overlaps in the glyphs, making them look interesting, but ultimately not functional as a real font. 

The application is built using the opentype.js library. Everytime the randomiser is changed, the program cycles through the glyphs and adds a random number to each point.
This works by extracting the svg path from the glyph, cycling through the path commands and adding the random value to every number it comes across. Then it is rebuilt into a glyph from the newly created svg path, and added into the array of new glyphs which is then formed into a typeface using the opentype.js library. 

This application was built for the Type & Written Language studio course at Aalto University, 2023.
