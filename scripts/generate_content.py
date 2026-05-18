from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF = Path(r"C:\Users\aitor\Downloads\APUNTEAK 2025-2026 (8).pdf")
OUT = ROOT / "lib" / "content.ts"

TEXT_TITLES = {
    1: "1812 Cadizko Konstituzioa",
    2: "Persiarren Manifestua",
    3: "Mendizabalen desamortizazio dekretua",
    4: "Burdinbideen Lege Orokorra",
    5: "1839ko urriaren 25eko legea",
    6: "1876ko uztailaren 21eko legea",
    7: "1876ko Konstituzioa",
    8: "Joaquin Costaren Oligarquía y caciquismo lanaren pasartea",
    9: "Federico Etxeberriaren hitzaldia librecambismoari eta protekzionismoari buruz",
    10: "Vicente Blasco Ibañezen El intruso eleberriaren pasartea",
    11: "Euskeldun Batzokijaren estatutuak",
    12: "La Lucha de Clases astekariko artikulua",
    13: "Clara Campoamor diputatuak Gorte Konstituziogileetan emandako hitzaldia",
    14: "Fronte Popularraren programa",
    15: "Euskal Herriko Autonomia Estatutua",
    16: "Bizkaian eta Gipuzkoan kontzertu ekonomikoak ezeztatzeko lege-dekretua",
    17: "Erantzukizun Politikoaren Legea",
    18: "Nazio-intereseko industriak babesteko legea",
    19: "Europako Mugimenduaren Kongresuaren Municheko erabakia",
    20: "Estatuaren Lege Organikoa",
    21: "Baionako Hitzarmena",
    22: "Antonio Añoveros Bilboko gotzainaren sermoia",
    23: "1978ko Espainiako Konstituzioa",
    24: "Euskal Herriko Autonomia Estatutua",
}

TEXT_DATES = {
    1: "1812-03-19",
    2: "1814-04-12",
    3: "1836-02-21",
    4: "1855-06-03",
    5: "1839-10-25",
    6: "1876-07-21",
    7: "1876-06-30",
    8: "1901",
    9: "1893-12-09",
    10: "1904",
    11: "1894",
    12: "1896-05-23",
    13: "1931-09-01",
    14: "1936-01-16",
    15: "1936-10-04",
    16: "1937-06-23",
    17: "1939-02-13",
    18: "1939-10-25",
    19: "1962-06-08",
    20: "1967-01-11",
    21: "1945-03-31",
    22: "1974-02-24",
    23: "1978-12-29",
    24: "1979-12-18",
}

THEMES = {
    1: "Estatu liberala",
    2: "Estatu liberala",
    3: "Estatu liberala",
    4: "Estatu liberala",
    5: "Foruak",
    6: "Foruak",
    7: "Berrezarkuntza",
    8: "Berrezarkuntza",
    9: "Industrializazioa",
    10: "Industrializazioa",
    11: "Nazionalismoa",
    12: "Langile-mugimendua",
    13: "II. Errepublika",
    14: "II. Errepublika",
    15: "Gerra Zibila",
    16: "Gerra Zibila",
    17: "Frankismoa",
    18: "Autarkia",
    19: "Oposizioa",
    20: "Frankismoa",
    21: "Erbestea",
    22: "Euskal gatazka",
    23: "Trantsizioa",
    24: "Autonomia",
}

RULES = [
    ("askatasunaren", ["tiraniaren", "diktaduraren"], 5, "Kontzeptu politiko kontrajarriak nahasten dituzte."),
    ("askatasuna", ["tirania", "diktadura"], 5, "Kontzeptu politiko kontrajarriak nahasten dituzte."),
    ("Monarkiaren", ["Errepublikaren"], 5, "Erregimen politikoaren aldaketa klasikoa da."),
    ("monarkiaren", ["Errepublikaren", "diktaduraren"], 5, "Clara Campoamorren testuan erregimen politikoen kontrastea da gakoa."),
    ("monarkia", ["errepublika", "diktadura"], 5, "Estatu-forma nahasteko aukera handia du."),
    ("Errepublika", ["Monarkia", "Diktadura"], 5, "Erregimen politikoaren aldaketa klasikoa da."),
    ("Errepublikako", ["Monarkiako"], 5, "Testuinguru politikoa aldatzen du."),
    ("Errepublikaren", ["Monarkiaren", "Diktaduraren"], 5, "Iturriaren eta testuinguru politikoaren erregimena aldatzen du."),
    ("monarkiaren menpe", ["Errepublikaren menpe", "diktaduraren menpe"], 5, "2025eko ereduko akatsaren antzekoa da: aurreko erregimenaren erreferentzia aldatzen du."),
    ("lehen", ["azken"], 5, "Ordena historikoa alderantzikatzen du."),
    ("azken", ["lehen"], 4, "Ordena historikoa alderantzikatzen du."),
    ("Espainia", ["Frantzia", "Italia"], 5, "Herrialde historikoa ordezkatzen da."),
    ("Espainiako", ["Frantziako", "Italiako"], 5, "Herrialde historikoa ordezkatzen da."),
    ("Espainiar", ["Frantziar", "Italiar"], 5, "Herrialdeari lotutako izenondoa ordezkatzen da."),
    ("espainiar", ["frantziar", "italiar"], 5, "Herrialdeari lotutako izenondoa ordezkatzen da."),
    ("Espainiaren", ["Frantziaren", "Italiaren"], 4, "Herrialdearen genitiboa ordezkatzen da."),
    ("Gipuzkoan eta Bizkaian", ["Gipuzkoan eta Araban", "Araban eta Bizkaian"], 5, "Probintzien nahasketa oso ohikoa da."),
    ("Gipuzkoa eta Bizkaia", ["Gipuzkoa eta Araba", "Araba eta Bizkaia"], 5, "Probintzien nahasketa oso ohikoa da."),
    ("Arabako", ["Bizkaiko", "Gipuzkoako"], 5, "Foru eta kontzertu ekonomikoetan lurraldea erabakigarria da."),
    ("Bizkaiko", ["Arabako", "Gipuzkoako"], 5, "Foru eta kontzertu ekonomikoetan lurraldea erabakigarria da."),
    ("Gipuzkoako", ["Arabako", "Bizkaiko"], 4, "Lurralde historikoen kokapena nahastu ohi da."),
    ("Nafarroa", ["Araba", "Bizkaia"], 4, "Lurralde historikoen kokapena nahastu ohi da."),
    ("txikiagoagatik", ["handiagoagatik"], 5, "Esaldiaren zentzua guztiz aldatzen du."),
    ("handiagoagatik", ["txikiagoagatik"], 5, "Esaldiaren zentzua guztiz aldatzen du."),
    ("uztailaren", ["maiatzaren", "apirilaren"], 5, "Hilabetea aldatzea akats errealen eredukoa da."),
    ("ekainaren", ["maiatzaren", "uztailaren"], 4, "Hilabetea aldatzea akats errealen eredukoa da."),
    ("Francisco Franco", ["Manuel Azaña", "Adolfo Suarez"], 5, "Pertsona historikoa nahasten du; erregeak ez dira erabiltzen."),
    ("Franco", ["Azaña", "Suarez"], 5, "Pertsona historikoa nahasten du; erregeak ez dira erabiltzen."),
    ("Azaña", ["Franco", "Canovas"], 4, "Pertsona historikoa nahasteko aukera dago."),
    ("katoliko", ["anglikano", "laiko"], 5, "Erlijio ofizialaren kontzeptua aldatzen du."),
    ("Katoliko", ["Anglikano", "Laiko"], 5, "Erlijio ofizialaren kontzeptua aldatzen du."),
    ("apostoliko", ["anglikano", "protestante"], 4, "Erlijio-terminologia nahasten du."),
    ("foru", ["zentralista", "unitario"], 5, "Foru-auziaren esanahia aldatzen du."),
    ("Foruak", ["Konstituzioak", "Dekretuak"], 5, "Foru sistemaren oinarria nahasten du."),
    ("autonomia", ["zentralismoa", "dependentzia"], 5, "Autonomia eta zentralismoa kontrajarriak dira."),
    ("Autonomia", ["Zentralismo", "Dependentzia"], 5, "Autonomia eta zentralismoa kontrajarriak dira."),
    ("subiranotasuna", ["menpekotasuna", "obedientzia"], 5, "Subiranotasunaren kontzeptu politikoa aldatzen du."),
    ("Nazioa", ["Monarkia", "Gobernua"], 4, "Subjektu politikoa nahasten du."),
    ("Gorteek", ["Gobernuak", "Armadak"], 4, "Erakunde politikoak nahasten ditu."),
    ("Gobernuak", ["Gorteek", "Elizak"], 4, "Erakunde politikoak nahasten ditu."),
    ("Senatua", ["Gobernua", "Auzitegia"], 4, "Instituzioak nahasteko aukera dago."),
    ("Diputatuen Kongresua", ["Senatua", "Ministro Kontseilua"], 4, "Instituzioak nahasteko aukera dago."),
    ("oligarkak", ["langileak", "nekazariak"], 4, "Berrezarkuntzako sistema politikoaren aktoreak aldatzen ditu."),
    ("jauntxoak", ["diputatuak", "langileak"], 4, "Kazikismoaren funtsezko aktorea da."),
    ("Gobernadore zibila", ["Gobernuburua", "Apezpikua"], 4, "Kazikismoaren tresna instituzionala nahasten du."),
    ("protekzionismoari", ["librekanbismoari", "sozialismoari"], 5, "Ekonomia-politika kontrajarriak nahasten ditu."),
    ("librekanbismoari", ["protekzionismoari", "autarkiari"], 5, "Ekonomia-politika kontrajarriak nahasten ditu."),
    ("aduana-zergen", ["errenta-zergen", "soldata-zergen"], 4, "Industrializazioaren babes-neurria aldatzen du."),
    ("langileen", ["jabeen", "militarren"], 5, "Subjektu soziala aldatzen du."),
    ("langile", ["jabe", "militar"], 4, "Subjektu soziala aldatzen du."),
    ("sufragio", ["errolda", "zentsura"], 5, "Eskubide politiko nagusia nahasten du."),
    ("amnistia", ["errepresioa", "zigorra"], 5, "Fronte Popularraren neurri nagusia aldatzen du."),
    ("nazionalizatu", ["pribatizatu", "desegin"], 4, "Programa politiko-ekonomikoaren zentzua aldatzen du."),
    ("sindikala", ["militarra", "erlijiosoa"], 4, "Eskubide edo mugimendu sozialaren izaera aldatzen du."),
    ("greba", ["zentsura", "erbeste"], 4, "Langile-eskubidea nahasten du."),
    ("demokratikoak", ["autoritarioak", "absolutistak"], 5, "Erregimen politikoaren izaera aldatzen du."),
    ("demokratikoa", ["autoritarioa", "absolutista"], 5, "Erregimen politikoaren izaera aldatzen du."),
    ("diktadura", ["demokrazia", "monarkia parlamentarioa"], 5, "Erregimen politikoa nahasten du."),
    ("Falangearen", ["Fronte Popularraren", "EAJren"], 4, "Frankismoko erakunde politikoa nahasten du."),
    ("Mugimendu Nazionalaren", ["Fronte Popularraren", "Errepublikaren"], 5, "Frankismoko kontzeptu politikoa aldatzen du."),
    ("Erresuma", ["Errepublika", "Federazioa"], 4, "Estatuaren forma juridikoa nahasten du."),
    ("monarkia parlamentarioa", ["errepublika federala", "diktadura militarra"], 5, "1978ko Konstituzioaren oinarrizko forma politikoa da."),
    ("pluralismo politikoa", ["alderdi bakarra", "zentralismo politikoa"], 5, "1978ko balio konstituzionala aldatzen du."),
    ("eskubide historikoak", ["pribilegio ekonomikoak", "eskubide kolonialak"], 5, "Foru-lurraldeen aitortza nahasten du."),
    ("Euskara", ["Gaztelania", "Frantsesa"], 5, "Hizkuntza propioaren aipamena aldatzen du."),
    ("hizkuntza ofiziala", ["hizkuntza debekatua", "hizkuntza bakarra"], 4, "Estatutuetako hizkuntza-araubidea nahasten du."),
    ("Polizia autonomoaren", ["Ejertzito nazionalaren", "Guardia Zibilaren"], 5, "Autogobernuko eskumena nahasten du."),
    ("emakumearen", ["gizonaren", "haurraren"], 5, "Sufragioari eta eskubide politikoei lotutako subjektua aldatzen du."),
    ("emakumeari", ["gizonari", "herritarrari"], 5, "Campoamorren testuko subjektu politikoa aldatzen du."),
    ("Zuzenbidean", ["Medikuntzan", "Elizan"], 4, "Emakumearen gaitasun juridiko-politikoa nahasten du."),
    ("latindar", ["germaniar", "anglosaxoi"], 4, "Campoamorren argudio geopolitikoa aldatzen du."),
    ("ganbera", ["elizbarruti", "udal"], 4, "Instituzio politikoa beste eremu batekin nahasten du."),
    ("Gorte Konstituziogileen", ["Gorte Arrunten", "Gorte Frankisten"], 4, "Iturri instituzionalaren izaera aldatzen du."),
    ("1933ko azaroaz", ["1934ko urriaz", "1936ko uztailaz"], 5, "Fronte Popularraren amnistiaren erreferentzia kronologikoa nahasten du."),
    ("delitu politiko eta sozialen", ["delitu militarren", "delitu ekonomikoen"], 5, "Amnistiaren izaera aldatzen du."),
    ("Estatu errepublikanoaren", ["Estatu monarkikoaren", "Estatu frankistaren"], 5, "Fronte Popularraren testuinguru politikoa aldatzen du."),
    ("lurra nazionalizatu", ["lurra pribatizatu", "bankuak nazionalizatu"], 5, "Programa politikoaren neurri ekonomikoa aldatzen du."),
    ("bankuak nazionalizatzeko", ["lurra nazionalizatzeko", "trenbideak pribatizatzeko"], 5, "Programa ekonomikoaren proposamena nahasten du."),
    ("langile-kontrola", ["kontrol militarra", "eliz kontrola"], 5, "Langileen parte-hartze ekonomikoa nahasten du."),
    ("Arabak, Gipuzkoak eta Bizkaiak", ["Nafarroak, Gipuzkoak eta Bizkaiak", "Arabak, Nafarroak eta Bizkaiak"], 5, "1936ko Estatutuaren lurralde-osaketa nahasten du."),
    ("Euskara, gaztelania bezala", ["Euskara, frantsesa bezala", "Gaztelania, euskara gabe"], 5, "Hizkuntza ofizialen araubidea nahasten du."),
    ("sufragio unibertsal, berdin, zuzen eta sekretu", ["sufragio zentsitario, zeharkako eta sekretu", "sufragio mugatu, publiko eta zeharkako"], 5, "Ordezkaritza demokratikoaren formula aldatzen du."),
    ("Bizkaiko gobernadore zibilak", ["Arabako gobernadore zibilak", "Nafarroako gobernadore militarrak"], 5, "1936ko behin-behineko gobernuaren prozedura nahasten du."),
    ("1934ko urriaren 1etik", ["1936ko uztailaren 18tik", "1931ko apirilaren 14tik"], 5, "Erantzukizun Politikoaren Legearen hasiera kronologikoa aldatzen du."),
    ("1936ko uztailaren 18ra", ["1934ko urriaren 1era", "1939ko apirilaren 1era"], 5, "Erantzukizun Politikoaren Legearen epe historikoa aldatzen du."),
    ("Falange Española Tradicionalista y de las JONSen", ["Fronte Popularraren", "EAJ-PNVren"], 5, "Frankismoaren erakunde politikoa nahasten du."),
    ("Fronte Popularra", ["Mugimendu Nazionala", "FET y de las JONS"], 5, "1936ko bloke politikoak kontrajartzen ditu."),
    ("erakunde separatistak", ["erakunde monarkikoak", "erakunde katolikoak"], 4, "Frankismoaren errepresioaren helburua aldatzen du."),
    ("nazio-intereseko", ["interes pribatudun", "interes kolonialeko"], 5, "Autarkiaren industria-politikako kategoria aldatzen du."),
    ("babesteko", ["pribatizatzeko", "zigortzeko"], 5, "Autarkiaren industria-politikaren helburua kontrako zentzuarekin ordezkatzen du."),
    ("inportaziotik", ["esportaziotik", "autarkiatik"], 5, "Autarkiaren helburu ekonomikoa nahasten du."),
    ("ekimen partikularra", ["ekimen sindikala", "ekimen militarra"], 4, "Industria-politikaren eragile ekonomikoa nahasten du."),
    ("Estatuak", ["Elizak", "Sindikatuek"], 4, "Autarkian esku-hartzen duen erakundea aldatzen du."),
    ("Gizakiaren Eskubideei", ["Estatuaren Printzipioei", "Falangearen Arauei"], 5, "Municheko testuaren erreferentzia demokratikoa aldatzen du."),
    ("adierazpen-askatasunari", ["zentsurari", "obedientzia politikoari"], 5, "Eskubide demokratikoa kontrako kontzeptuarekin ordezkatzen du."),
    ("alderdi politikoak", ["alderdi bakarra", "sindikatu bertikalak"], 5, "Pluralismo politikoa eta alderdi bakarra kontrajartzen ditu."),
    ("bortxakeria aktibo nahiz pasiboari", ["hauteskunde askeei", "autonomia eskubideari"], 4, "Municheko konpromiso politikoa aldatzen du."),
    ("Espainiar estatua", ["Italiar estatua", "Frantziar estatua"], 5, "Estatu frankistaren subjektu politikoa aldatzen du."),
    ("botere-batasunaren", ["botere-banaketaren", "subiranotasun herrikoiaren"], 5, "Frankismoaren egitura politikoa kontrako printzipioarekin ordezkatzen du."),
    ("Estatuburua", ["Gobernuburua", "Gorteetako presidentea"], 5, "Frankismoaren botere gorenaren figura nahasten du."),
    ("Gobernuburuak", ["Estatuburuak", "Diputatuek"], 4, "Estatuaren Lege Organikoko kargu politikoa nahasten du."),
    ("Euzkadiko Gobernua", ["Espainiako Gobernua", "Falangearen Gobernua"], 5, "Erbesteko euskal erakunde politikoa nahasten du."),
    ("Jose Antonio Agirre", ["Francisco Franco", "Manuel Azaña"], 5, "Euskal gobernuaren lehendakaria beste figura batekin ordezkatzen du."),
    ("Francoren gobernuaren", ["Errepublikaren gobernuaren", "Agirreren gobernuaren"], 5, "Baionako Hitzarmeneko aurkari politikoa aldatzen du."),
    ("monarkia berrezartzearen", ["errepublika berrezartzearen", "autonomia berrezartzearen"], 4, "Baionako Hitzarmeneko arrisku politikoa nahasten du."),
    ("euskal gatazka", ["auzi soziala", "krisi ekonomikoa"], 5, "Añoverosen sermoiaren arazo nagusia aldatzen du."),
    ("zapalduta", ["askatuta", "integratuta"], 5, "Sermoiaren salaketa politikoaren zentzua aldatzen du."),
    ("Euskararen erabilera", ["Gaztelaniaren erabilera", "Frantsesaren erabilera"], 5, "Sermoiaren hizkuntza-arazo nagusia nahasten du."),
    ("irakaskuntzan eta komunikabideetan", ["armadan eta epaitegietan", "bankuetan eta lantegietan"], 4, "Euskararen murrizketaren eremuak aldatzen ditu."),
    ("Elizak", ["Estatuak", "Armadak"], 4, "Sermoiaren subjektu instituzionala nahasten du."),
    ("zuzenbide-estatu sozial eta demokratiko", ["estatu autoritario eta zentralista", "monarkia absolutu eta konfesional"], 5, "1978ko Konstituzioaren definizio nagusia aldatzen du."),
    ("Espainiako herriari", ["Erregeari", "Armadari"], 5, "Subiranotasun nazionalaren titularra nahasten du."),
    ("nazionalitate eta eskualdeen", ["probintzia eta kolonien", "udalerri eta elizbarrutien"], 5, "Autonomia-eskubidearen subjektuak nahasten ditu."),
    ("foru-lurraldeen", ["kolonia-lurraldeen", "udal-lurraldeen"], 5, "Eskubide historikoen titularra aldatzen du."),
    ("Euskadi edo Euskal Herria", ["Nafarroa edo Espainia", "Bizkaia edo Gipuzkoa"], 5, "1979ko Estatutuaren izendapena nahasten du."),
    ("Nafarroak ere", ["Errioxak ere", "Kantabriak ere"], 5, "Gernikako Estatutuaren lurralde-aukerari eragiten dio."),
    ("Lurralde Historikoek", ["Probintzia arruntek", "Udalerriek"], 5, "EAEren egitura instituzionala nahasten du."),
    ("Estatuko Segurtasun Indar eta Gorputzak", ["Polizia autonomoak", "Euzko Gudarosteak"], 5, "Polizia-eskumenen banaketa nahasten du."),
]

EVENTS = [
    ("1807", "Fontainebleauko Ituna", "Estatu liberala", 4),
    ("1808-05-02", "Independentzia Gerraren hasiera", "Estatu liberala", 5),
    ("1808", "Aranjuezeko altxamendua", "Estatu liberala", 4),
    ("1808", "Baionako abdikazioak", "Estatu liberala", 4),
    ("1808", "Baionako Estatutua", "Estatu liberala", 4),
    ("1810", "Junta Zentrala sortzea", "Estatu liberala", 3),
    ("1810-1812", "Cadizeko Gorteak eta Konstituzioaren lanketa", "Estatu liberala", 4),
    ("1812-03-19", "Cadizko Konstituzioa aldarrikatzea", "Estatu liberala", 5),
    ("1814", "Fernando VII.aren itzulera Espainiara", "Absolutismoa", 4),
    ("1814-04-12", "Persiarren Manifestua", "Absolutismoa", 4),
    ("1830", "Santzio Pragmatikoa ezartzea", "Estatu liberala", 4),
    ("1833", "Lehen Karlistaldiaren hasiera", "Foruak", 5),
    ("1837", "1837ko Konstituzioa", "Estatu liberala", 4),
    ("1839-08-31", "Bergarako Besarkada", "Foruak", 5),
    ("1839-10-25", "Foruak berresten dituen legea", "Foruak", 5),
    ("1841", "Nafarroako Lege Hitzartua", "Foruak", 4),
    ("1841-10-29", "Foruak eraldatzeko dekretua", "Foruak", 4),
    ("1844", "Isabel II.aren erreginaldiaren hasiera", "Estatu liberala", 3),
    ("1856", "Bessemer bihurgailuaren hedapena", "Industrializazioa", 3),
    ("1855-06-03", "Burdinbideen Lege Orokorra", "Ekonomia", 4),
    ("1860", "Burdinbide sarearen hedapena Euskal Herrian", "Industrializazioa", 3),
    ("1860", "Banco de Bilbaoren sorrera inguruko finantza garapena", "Industrializazioa", 3),
    ("1868", "Iraultza Loriatsua", "Seiurtekoa", 5),
    ("1871", "Amadeo Saboikakoaren erregealdiaren hasiera", "Seiurtekoa", 4),
    ("1873", "Lehen Errepublika aldarrikatzea", "Seiurtekoa", 5),
    ("1873", "Hirugarren Gerra Karlistaren indartzea", "Foruak", 4),
    ("1874", "Berrezarkuntzaren hasiera", "Berrezarkuntza", 5),
    ("1875", "Berrezarkuntza garaia hasten da", "Berrezarkuntza", 4),
    ("1876-06-30", "1876ko Konstituzioa", "Berrezarkuntza", 5),
    ("1876-07-21", "Foru-indargabetzearen legea", "Foruak", 5),
    ("1878", "Lehen Kontzertu Ekonomikoa", "Foruak", 5),
    ("1879", "PSOEren sorrera", "Langile-mugimendua", 4),
    ("1887", "Elkarteen Legea", "Langile-mugimendua", 4),
    ("1890", "Lehen greba modernoen hasiera", "Langile-mugimendua", 4),
    ("1890", "Babes-politika protekzionistaren indartzea", "Industrializazioa", 4),
    ("1893-12-09", "Federico Etxeberriaren hitzaldia", "Industrializazioa", 4),
    ("1894", "Euskeldun Batzokijaren estatutuak", "Nazionalismoa", 5),
    ("1895", "EAJ-PNVren sorrera", "Nazionalismoa", 5),
    ("1896-05-23", "La Lucha de Clases artikulua", "Langile-mugimendua", 4),
    ("1898", "Kubako gerra eta 98ko krisia", "Berrezarkuntza", 5),
    ("1901", "Oligarquía y caciquismo argitaratzea", "Berrezarkuntza", 4),
    ("1909", "Bartzelonako Aste Tragikoa", "Berrezarkuntza", 4),
    ("1917", "1917ko krisia", "Berrezarkuntza", 5),
    ("1923-09-13", "Primo de Riveraren estatu-kolpea", "Diktadura", 5),
    ("1929", "Depresio Handia edo 29ko krisia", "Berrezarkuntza", 3),
    ("1930", "Primo de Riveraren diktaduraren amaiera", "Diktadura", 4),
    ("1930", "Donostiako Ituna", "II. Errepublika", 5),
    ("1931-04-14", "II. Errepublika aldarrikatzea", "II. Errepublika", 5),
    ("1931", "1931ko Konstituzioa", "II. Errepublika", 5),
    ("1931-09-01", "Clara Campoamorren hitzaldia", "II. Errepublika", 4),
    ("1931-1933", "Biurteko erreformista", "II. Errepublika", 5),
    ("1932", "Sanjurjada", "II. Errepublika", 4),
    ("1933-1936", "Zentro-eskuineko biurtekoa", "II. Errepublika", 4),
    ("1933-11-05", "Euskal Autonomia Estatutuaren herri-erreferenduma", "Autonomia", 5),
    ("1933-11", "Emakumeek lehen aldiz bozkatu hauteskunde orokorretan", "II. Errepublika", 4),
    ("1934-10", "Urriko Iraultza", "II. Errepublika", 4),
    ("1936-01-16", "Fronte Popularraren programa", "II. Errepublika", 5),
    ("1936-07-17", "Altxamendu militarraren hasiera", "Gerra Zibila", 5),
    ("1936-10-01", "Franco estatuburu izendatzea", "Gerra Zibila", 4),
    ("1936-09", "Nazionalek Gipuzkoa hartzea", "Gerra Zibila", 4),
    ("1936-10-04", "1936ko Euskal Autonomia Estatutua", "Autonomia", 5),
    ("1936-10-07", "Lehen Eusko Jaurlaritza eratzea", "Gerra Zibila", 5),
    ("1936-10-07", "Euzko Gudarostea sortzea", "Gerra Zibila", 4),
    ("1937", "Iparraldeko frontea nazionalen esku", "Gerra Zibila", 4),
    ("1937-04-26", "Gernikako bonbardaketa", "Gerra Zibila", 5),
    ("1937-06-19", "Bilbo erortzea", "Gerra Zibila", 5),
    ("1937-06-23", "Bizkaia eta Gipuzkoako kontzertu ekonomikoak ezeztatzea", "Gerra Zibila", 5),
    ("1937-08", "Santoñako Ituna", "Gerra Zibila", 4),
    ("1938", "Aragoi, Katalunia, Valentzia eta Madrilen aurkako azken ofentsibak", "Gerra Zibila", 3),
    ("1939-02-13", "Erantzukizun Politikoaren Legea", "Frankismoa", 5),
    ("1939-04-01", "Gerra Zibilaren amaiera", "Frankismoa", 5),
    ("1939-10-25", "Nazio-intereseko industriak babesteko legea", "Autarkia", 4),
    ("1941", "Dibisio Urdina Sobietar Batasunera bidaltzea", "Frankismoa", 3),
    ("1943", "Espainiaren neutraltasun-ituna Bigarren Mundu Gerran", "Frankismoa", 3),
    ("1945-03-31", "Baionako Hitzarmena", "Erbestea", 4),
    ("1953", "Espainia-AEB itunak", "Frankismoa", 4),
    ("1953", "Egoitza Santuarekin Konkordatua", "Frankismoa", 4),
    ("1955", "Espainia NBEn sartzea", "Frankismoa", 4),
    ("1956", "Marokoren independentzia Espainiarekiko", "Frankismoa", 3),
    ("1959", "Egonkortze Plana", "Desarrollismoa", 5),
    ("1963", "Garapen Plana", "Desarrollismoa", 4),
    ("1962-06-08", "Municheko Kongresuaren erabakia", "Oposizioa", 5),
    ("1966", "Prentsaren Legea", "Frankismoa", 4),
    ("1967-01-11", "Estatuaren Lege Organikoa", "Frankismoa", 5),
    ("1968", "ETAren lehen hilketa", "Euskal gatazka", 4),
    ("1968", "Guinea Ekuatorialaren independentzia", "Frankismoa", 3),
    ("1969", "Juan Carlos ondorengo izendatzea", "Frankismoa", 4),
    ("1970", "Burgoseko Prozesua", "Euskal gatazka", 5),
    ("1973", "Petrolioaren krisia", "Desarrollismoa", 4),
    ("1973", "Carrero Blanco gobernuburu izendatzea", "Frankismoa", 4),
    ("1973-12-20", "Carrero Blancoren aurkako atentatua", "Frankismoa", 5),
    ("1974-02-24", "Añoverosen sermoia", "Euskal gatazka", 4),
    ("1975-11-20", "Francoren heriotza", "Trantsizioa", 5),
    ("1975", "Gorteek Juan Carlos Borboikoa errege izendatzea", "Trantsizioa", 4),
    ("1976", "Platajunta sortzea", "Trantsizioa", 4),
    ("1976-03-03", "Gasteizko martxoaren 3ko gertaerak", "Trantsizioa", 4),
    ("1976", "Erreforma Politikorako Legea erreferendumean onartzea", "Trantsizioa", 5),
    ("1977-06-15", "Lehen hauteskunde demokratikoak", "Trantsizioa", 5),
    ("1977-10", "Moncloako Itunak", "Trantsizioa", 4),
    ("1978-12-06", "1978ko Konstituzioaren erreferenduma", "Trantsizioa", 5),
    ("1978-12-29", "1978ko Konstituzioa BOEn argitaratzea", "Trantsizioa", 5),
    ("1979-10-25", "Gernikako Estatutuaren erreferenduma", "Autonomia", 5),
    ("1979-12-18", "Euskal Herriko Autonomia Estatutua", "Autonomia", 5),
    ("1980", "Lehen Eusko Jaurlaritza autonomikoa", "Autonomia", 4),
    ("1981", "Kontzertu Ekonomikoa sinatzea", "Autonomia", 5),
    ("1981-02-23", "23-F estatu-kolpe saiakera", "Trantsizioa", 5),
    ("1982-10", "Felipe Gonzalezen gobernu aldaketa", "Trantsizioa", 4),
    ("1909-07", "Afrikako Gerra", "Berrezarkuntza", 5),
    ("1931-04-14", "Alfontso XIII.aren erbesteratzea", "II. Errepublika", 5),
]


def normalize_text(text: str) -> str:
    text = text.replace("\ufb01", "fi").replace("\ufb02", "fl")
    replacements = {
        "Ã¡": "á",
        "Ã©": "é",
        "Ã­": "í",
        "Ã³": "ó",
        "Ãº": "ú",
        "Ã±": "ñ",
        "Âª": "ª",
        "Â´": "'",
        "â€¦": "(...)",
        "â€œ": "“",
        "â€": "”",
        "â€˜": "‘",
        "â€™": "’",
        "â€”": "—",
        "â€“": "-",
        "â—": "",
    }
    for bad, good in replacements.items():
        text = text.replace(bad, good)
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s+-\s+\d+\s+-\s*", " ", text)
    text = re.sub(r"2025-2026 IKASTURTEA", "", text)
    return text.strip()


def extract_sources() -> list[dict]:
    reader = PdfReader(str(PDF))
    items = []
    seen = set()
    for page in reader.pages[14:170]:
        page_text = normalize_text(page.extract_text() or "")
        matches = list(re.finditer(r"(?<!\d)(\d{1,2})\.\s+Idatzizko\s+iturria:\s+", page_text))
        for idx, match in enumerate(matches):
            number = int(match.group(1))
            if number not in TEXT_TITLES or number in seen:
                continue
            next_match = matches[idx + 1] if idx + 1 < len(matches) else None
            chunk = page_text[match.start() : next_match.start() if next_match else len(page_text)]
            title = TEXT_TITLES[number]
            body = re.sub(rf"^{number}\.\s+Idatzizko\s+iturria:\s+", "", chunk).strip()
            body = body.replace(title.upper(), "").replace(title, "").strip(" .")
            if number == 9:
                body = body.replace("Federico Etxeberriaren hitzaldia librekanbismoari eta protekzionismoari buruz (1893-12-09)", "").strip()
            if number == 10:
                body = body.replace("Vicente Blasco Ibáñezen “El intruso” elebarriaren pasartea (1904)", "").strip()
            if number == 13:
                body = body.replace("CLARA CAMPOAMOR DIPUTATUAK GORTE KONSTITUZIOGILEETAN EMANDAKO HITZALDIA (1931-09-01)", "").strip()
            body = re.sub(r"^\([^)]*\)\s*", "", body)
            body = normalize_text(body)
            body = re.sub(r"\b\d+\.\s+GAIA\..*$", "", body).strip()
            items.append(
                {
                    "id": f"text-{number:02d}",
                    "number": number,
                    "title": title,
                    "date": TEXT_DATES[number],
                    "theme": THEMES[number],
                    "body": body,
                }
            )
            seen.add(number)
    return sorted(items, key=lambda x: x["number"])


def make_ordering_sets(events: list[dict]) -> list[dict]:
    sets = []
    by_theme: dict[str, list[dict]] = {}
    for event in events:
        by_theme.setdefault(event["theme"], []).append(event)
    for theme, group in by_theme.items():
        group = sorted(group, key=lambda x: x["sortKey"])
        for i in range(max(0, len(group) - 4)):
            sets.append(
                {
                    "id": f"set-{len(sets)+1:03d}",
                    "title": theme,
                    "eventIds": [event["id"] for event in group[i : i + 5]],
                    "priority": max(event["priority"] for event in group[i : i + 5]),
                }
            )
    ordered = sorted(events, key=lambda x: x["sortKey"])
    for window in (5, 7, 9, 11, 13):
        for i in range(0, len(ordered) - 4, 2):
            picked = ordered[i : i + window : max(1, window // 5)][:5]
            if len(picked) == 5:
                sets.append(
                    {
                        "id": f"set-{len(sets)+1:03d}",
                        "title": "Kronologia orokorra",
                        "eventIds": [event["id"] for event in picked],
                        "priority": max(event["priority"] for event in picked),
                    }
                )
            if len(sets) >= 120:
                return sets
    while len(sets) < 120:
        offset = len(sets) % (len(ordered) - 4)
        picked = ordered[offset : offset + 5]
        sets.append(
            {
                "id": f"set-{len(sets)+1:03d}",
                "title": "Errepaso mistoa",
                "eventIds": [event["id"] for event in picked],
                "priority": max(event["priority"] for event in picked),
            }
        )
    return sets


def date_sort_key(value: str) -> str:
    value = value.replace("ko", "")
    if re.match(r"^\d{4}-\d{4}$", value):
        value = value.split("-")[0]
    parts = value.split("-")
    if len(parts) == 1:
        return f"{parts[0]}-00-00"
    if len(parts) == 2:
        return f"{parts[0]}-{parts[1]}-00"
    return value


def main() -> None:
    texts = extract_sources()
    events = [
        {
            "id": f"event-{idx+1:03d}",
            "date": date,
            "sortKey": date_sort_key(date),
            "label": label,
            "theme": theme,
            "priority": priority,
        }
        for idx, (date, label, theme, priority) in enumerate(EVENTS)
    ]
    ordering_sets = make_ordering_sets(events)
    payload = {
        "texts": texts,
        "trapRules": [
            {
                "id": f"rule-{idx+1:03d}",
                "correct": correct,
                "wrongOptions": wrongs,
                "priority": priority,
                "reason": reason,
            }
            for idx, (correct, wrongs, priority, reason) in enumerate(RULES)
        ],
        "events": events,
        "orderingSets": ordering_sets,
    }
    OUT.write_text(
        "import type { HistoryEvent, OrderingSet, TextSource, TrapRule } from './types';\n\n"
        f"export const texts = {json.dumps(payload['texts'], ensure_ascii=False, indent=2)} satisfies TextSource[];\n\n"
        f"export const trapRules = {json.dumps(payload['trapRules'], ensure_ascii=False, indent=2)} satisfies TrapRule[];\n\n"
        f"export const events = {json.dumps(payload['events'], ensure_ascii=False, indent=2)} satisfies HistoryEvent[];\n\n"
        f"export const orderingSets = {json.dumps(payload['orderingSets'], ensure_ascii=False, indent=2)} satisfies OrderingSet[];\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT}")
    print(f"texts={len(texts)} events={len(events)} orderingSets={len(ordering_sets)}")


if __name__ == "__main__":
    main()
