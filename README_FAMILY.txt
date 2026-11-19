VEŘEJNÝ WEB: https://kato-cpu-tech.github.io/apartment-preview/

Toto je publikační výběr souborů pro web. Skripty a podrobné kontroly
popsané níže jsou součástí úplného místního projektu apartment-family-v2.zip.

RODINNÝ BYT – TESTOVACÍ VARIANTA 02

Otevření webu
Otevřete index.html v běžném prohlížeči. Galerie, obrázky i prostorový model
jsou místní. Není potřeba účet, instalace, internet ani přístup k jiným souborům.
viewer_template.html je pouze vývojová šablona; hotové stránky jsou index.html
a samostatný viewer.html. Prohlížeč modelu vyžaduje WebGL.

Místní HTTP náhled
Volitelný serve_local.py používá pouze standardní knihovnu Pythonu. Spouštějte
jej jen po vlastním schválení. Omezí se na 127.0.0.1 a složku tohoto projektu,
neposkytuje zápis a nezpřístupňuje web do sítě. Příkaz ze složky projektu:

python3 serve_local.py --port 8765

Adresa: http://127.0.0.1:8765/
Zastavení: Ctrl+C v terminálu serveru.

Co je pevné pro tento test
Stěny, podlahové a stropní objemy, geometrie oken a dveří jsou převzaté beze změny
z původního P01. Jejich skutečné vyhodnocené sítě a transformace kontroluje
blender_guard.py. Nábytek má 31 samostatných záznamů v furniture_layout.json.
Hlavní rozmístění vychází z obrázku; terasové sezení, světla, textilie a doplňky
jsou návrhové doplnění. Výšky nábytku ani jeho přesné výrobní rozměry nejsou
v půdorysu doložené.

Sada cameras.json obsahuje 16 fotografických kamer: dva pohledy z každé ze
sedmi místností a další dva z terasy. Navíc uchovává kontrolní axonometrii
a půdorysný řez. Kamery, jejich orientace, ohniska a rozlišení jsou uložené;
jejich oči byly zkontrolovány proti skutečné vyhodnocené geometrii.

Jde o pevný testovací základ, nikoli potvrzené zaměření bytu. Doložená světlá
výška je 2,600 m. Půdorysné rozměry a svislé osazení otvorů zůstávají předběžné.
Plochy se od tabulky v podkladu liší, většinou o 4–6 %, WC přibližně o 18 %.
Nejsou svévolně upravené pro dosažení tabulkových ploch.

Scéna a obrázky
apartment.blend obsahuje skutečné stavební objemy a otvory, 3D nábytek,
procedurální materiály, světla a všechny kamery. Byl sestaven a ověřen
v Blenderu 5.3.0. Materiály nejsou nalepené vizualizace před neprostupnou stěnou.
Všechny výsledné interiérové obrázky vznikají z této jediné scény přes Cycles.
Nepoužívají generativní překreslování půdorysu ani změny dispozice mezi pohledy.

Terasové dveřní křídlo má stejnou uloženou geometrii, polohu i pracovní úhel
jako P01; jeho materiál je prosklený a přidaný bílý profil patří k variantě.
Neznámé okolí za okny nahrazuje neutrální studiový horizont. Nevyjadřuje
skutečné podlaží, sousední budovy ani výhled. Je uložený přímo v .blend.
Terasa a její zábradlí zůstávají pracovní interpretací nejednoznačné předlohy.

renders_family/ obsahuje finální PNG, webové JPEG a render_manifest.json.
Finální kamery používají rozlišení 1600 × 1100, Cycles, maximálně 64 vzorků,
adaptivní práh 0,04 a denoising. Strop zůstává přítomný u všech interiérů.
Pracovní poloviční náhledy vznikaly v previews_family/. Nejsou zahrnuté
v závěrečném ZIP. Finální index.html používá výhradně renders_family/.

Stejný pohled v další variantě
Nevytvářejte stavební model znovu podle obrázku. Vyjděte ze stejného .blend,
zachovejte apartment.json, furniture_layout.json a cameras.json. Měňte
materiály a světla, případně návrhové doplňky. Hlavní umístění nábytku
a stejné kamery hlídá family_guard.py proti family_test_baseline.json.
Při změně konstrukce, transformace, půdorysné stopy nábytku či kamery kontrola
selže a vypíše dotčené ID. Schválená úprava dispozice patří do nové revize.

styles/modern-family.json je samostatný snímek materiálů, barev, povrchů,
světelných intenzit a expozice této varianty. Neobsahuje stavební geometrii,
rozmístění nábytku ani kamery. Jeho kopii lze upravit a použít přes
style_preset.py --apply styles/variant.json --output apartment_variant.blend.
Skript aplikuje pouze vzhled a před uložením zkontroluje zachování pevných
částí. Výsledek uloží do nového .blend, původní scénu nepřepisuje.

Opakování renderů z aktuální scény, ze složky projektu:

/Applications/Blender.app/Contents/MacOS/Blender --background --python-exit-code 1 apartment.blend --python verify_family.py
/Applications/Blender.app/Contents/MacOS/Blender --background --python-exit-code 1 apartment.blend --python render_family.py -- --resume

Jedna kamera:
/Applications/Blender.app/Contents/MacOS/Blender --background --python-exit-code 1 apartment.blend --python render_family.py -- --camera CAM_R06_A

Aktualizace 3D náhledu ze skutečné scény a sestavení galerie:
/Applications/Blender.app/Contents/MacOS/Blender --background --python-exit-code 1 apartment.blend --python export_family_viewer.py
python3 build_local_site.py

Pro novou materiálovou variantu používejte novou složku/revizi a vlastní složku
renderů. Přepínač --resume pokračuje v téže dávce. Porovnává také podpis
uloženého .blend a nastavení renderu: při uložení nových materiálů či světel
tak staré snímky nepřeskočí. Po změně stylu lze renderovat i bez --resume.

Znovusestavení stejné návrhové varianty:
/Applications/Blender.app/Contents/MacOS/Blender --background --python-exit-code 1 apartment.blend --python build_family.py

build_family.py nahradí pouze vlastní variantní objekty, nikoli stavební prvky.
Při změně pevného rozmístění či kamer hlídač vyžaduje novou vědomou revizi.

Kontroly a podklady
checks/geometry_report_blender.json a CSV: očekávané a skutečně měřené hodnoty.
checks/family_camera_validation.json: fyzická umístění všech 16 kamer.
checks/family_verification.json: zachování geometrie a testy hlídačů změn.
checks/family_test_baseline.json: pevný testovací snímek, nikoli souhlas se
  správností neokótovaného výkresu.
furniture_layout.json: rozmístění se zdrojem pixelových odhadů.
cameras.json: pevná sada pohledů.
reference/floorplan.jpg: původní obrázek.
source_assessment.html: podklady, měřítko, rozpory a nejistoty.

Původní .gltf a .obj v této složce zachovávají neutrální stavební export P01.
Kompletní zařízenou verzi představuje apartment.blend a nový viewer.html.

Navazující workflow
1. Dodat co nejlépe okótovaný výkres a výškové údaje.
2. Sestavit a změřit skutečnou stavební geometrii a potvrdit ji.
3. Potvrdit rozmístění nábytku a standardní kamery.
4. Zmrazit tyto tři části jako verzi a měnit samostatně styl, materiály a světla.
5. Před každou dávkou automaticky ověřit zachování pevných částí.

Nebyl instalován žádný program, balíček ani rozšíření. Web je místní;
žádná kopie tohoto projektu nebyla publikována na internetu.
