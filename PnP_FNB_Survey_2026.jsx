import { useState, useEffect, useRef } from "react";

// ─── API CONFIG ────────────────────────────────────────────────────
// Update these two values after deploying the server
// Or set as Vite env vars: VITE_API_URL and VITE_API_KEY
const M2M_API_URL = "https://your-api.railway.app";
const M2M_API_KEY = "YOUR_API_KEY_HERE";

// ─── USER DATABASE (from User_Table.csv) ───────────────────────────────────
const USERS = [{"id":784,"userName":"PnP Franchise Vryheid","email":"pnpfranchisevryheid@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":780,"userName":"PnP Witpoortjie","email":"pnpwitpoortjie@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":776,"userName":"PnP Elspark","email":"pnpelspark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":772,"userName":"PnP Hyper Boksburg","email":"pnphyperboksburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":768,"userName":"PnP Heidelberg","email":"pnpheidelberg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":764,"userName":"PnP Diepkloof","email":"pnpdiepkloof@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":760,"userName":"PnP Protea Glen Boulevard","email":"pnpproteaglenboulevard@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":752,"userName":"PNP Moruleng","email":"pnpmoruleng@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":748,"userName":"PNP Rustenburg","email":"pnpRustenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":744,"userName":"PNP Franchise Zeerust","email":"pnpfranchisezeerust@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":740,"userName":"PNP Franchise Galeshewe","email":"pnpfranchisegaleshewe@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":736,"userName":"PNP Franchise Mafikeng","email":"pnpfranchisemafikeng@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":732,"userName":"PNP Franchise Fleurdal","email":"pnpfranchisefleurdal@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":728,"userName":"PNP Franchise Rondebosch","email":"pnpfranchiserondebosch@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":724,"userName":"PNP Tokai","email":"pnptokai@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":720,"userName":"PNP Pinelands","email":"pnppinelands@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":716,"userName":"PNP Plattekloof","email":"pnpplattekloof@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":712,"userName":"PNP Franchise Observatory","email":"pnpfranchiseobservatory@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":708,"userName":"PnP Eersterust","email":"pnpeersterust@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":704,"userName":"PNP Constantia","email":"pnpconstantia@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":700,"userName":"PNP Secunda Mall","email":"pnpsecundamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":696,"userName":"PNP Midwater - Middelburg","email":"pnpmidwatermiddelburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":692,"userName":"PNP Ilanga Mall","email":"pnpilangamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":688,"userName":"PNP Highveld Mall","email":"pnphighveldmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":683,"userName":"PNP Local Hazyview","email":"pnplocalhazyview@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":679,"userName":"PNP Kwa-Guqa - Witbank","email":"pnpkwa-guqawitbank@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":675,"userName":"PNP Savannah","email":"pnpsavannah@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":671,"userName":"PNP Franchise Modimolle","email":"pnpfranchisemodimolle@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":667,"userName":"PNP Mokopane Mall","email":"pnpmokopanemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":663,"userName":"PNP Thavhani Mall","email":"pnpthavhanimall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":659,"userName":"PNP Polokwane CBD","email":"pnppolokwanecbd@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":655,"userName":"PnP Waverley","email":"pnpwaverley@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":651,"userName":"PNP Franchise Dundee","email":"pnpfranchisedundee@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":647,"userName":"PNP Franchise Pongola","email":"pnpfranchisepongola@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":643,"userName":"PnP Garankuwa","email":"pnpgarankuwa@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":638,"userName":"PnP Hyper Faerie Glen","email":"pnphyperfaerieglen@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":630,"userName":"PnP Equestria Mall","email":"pnpequestriamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":625,"userName":"PnP Hyper Wonderpark","email":"pnphyperwonderpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":620,"userName":"PnP Kempton Square","email":"pnpkemptonsquare@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":616,"userName":"PnP Boardwalk Mall","email":"pnpboardwalkmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":612,"userName":"PnP Commercial Road","email":"pnpcommercialroad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":608,"userName":"PnP Uitenhage","email":"pnpuitenhage@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":604,"userName":"PnP Heugh Road","email":"pnpheughroad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":600,"userName":"PnP Walmer Park","email":"pnpwalmerpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":596,"userName":"PnP King Williams Town","email":"pnpkingwilliamstown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":592,"userName":"PnP Grahamstown","email":"pnpgrahamstown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":588,"userName":"PNP  Franchise The Galleria","email":"pnpfranchisethegalleria@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":583,"userName":"PNP Franchise Pioneer Park","email":"pnpfranchisepioneerpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":579,"userName":"PNP  Franchise Port Shepstone","email":"pnpfranchiseportshepstone@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":575,"userName":"PnP Hyper DBN North","email":"pnphyperdurbannorth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":785,"userName":"Colette","email":"craposo@pnp.co.za","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":781,"userName":"PnP Southgate","email":"pnpsouthgate@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":777,"userName":"PnP Mulbarton Park","email":"pnpmulbartonpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":773,"userName":"PnP Sherwood","email":"pnpsherwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":769,"userName":"PnP Hyper Greenstone","email":"pnphypergreenstone@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":765,"userName":"PnP Dobsonville","email":"pnpdobsonville@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":761,"userName":"PnP Newmarket","email":"pnpnewmarket@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":757,"userName":"PnP Jackal Creek","email":"pnpjackalcreek@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":753,"userName":"PNP Maluti Crescent","email":"pnpmaluticrescent@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":749,"userName":"PNP Franchise Preller Walk Mall","email":"pnpfranchiseprellerwalkmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":745,"userName":"PNP Franchise Kuruman","email":"pnpfranchisekuruman@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":741,"userName":"PNP Royldene","email":"pnproyldene@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":737,"userName":"PNP Franchise Songloed","email":"pnpfranchisesongloed@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":733,"userName":"PNP Franchise Azalea Park","email":"pnpfranchiseazaleapark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":729,"userName":"PNP Gardens","email":"pnpgardens@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":725,"userName":"PNP Franchise Kraaifontein (Darwin Road)","email":"pnpfranchisekraaifontein@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":721,"userName":"PnP Tshwane Mall","email":"pnptshwanemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":717,"userName":"PNP Franchise Kuils River","email":"pnpfranchisekuilsriver@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":713,"userName":"PNP Muizenburg","email":"pnpmuizenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":709,"userName":"PNP VAWaterfront","email":"pnpwaterfront@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":705,"userName":"PNP Kenilworth","email":"pnpkenilworth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":701,"userName":"PNP Franchise Nkomazi Plaza","email":"pnpfranchisenkomaziplaza@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":697,"userName":"PNP Local Hendrina","email":"pnplocalhendrina@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":693,"userName":"PNP Franchise Reyno Ridge","email":"pnpfranchisereynoridge@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":689,"userName":"PNP Franchise Standerton","email":"pnpfranchisestanderton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":684,"userName":"PNP Franchise River Crescent","email":"pnpfranchiserivercrescent@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":680,"userName":"PNP Franchise Barberton","email":"pnpfranchisebarberton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":676,"userName":"PNP Makhado","email":"pnpmakhado@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":672,"userName":"PNP Mall of the North","email":"pnpmallofthenorth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":668,"userName":"PNP Franchise Bela-Bela","email":"pnpfranchisebela-bela@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":664,"userName":"PNP Franchise Hoedspruit","email":"pnpfranchisehoedspruit@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":660,"userName":"PNP Franchise Thaba Mall","email":"pnpfranchisethabamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":656,"userName":"PnP Alex Mall","email":"pnpalexmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":652,"userName":"PnP Ferndale On Republic","email":"pnpferndaleonrepublic@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":648,"userName":"PNP Shelly Beach","email":"pnpshellybeach@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":644,"userName":"PnP Bronkhorstspruit","email":"pnpbronkhorstspruit@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":640,"userName":"PnP On Nicol","email":"pnponnicol@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":633,"userName":"PnP Douglasdale","email":"pnpdouglasdale@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":627,"userName":"PnP San Ridge Square","email":"pnpsanridgesquare@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":621,"userName":"PnP Birch Acres - Tembisa","email":"pnpbirchacres@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":617,"userName":"PnP Busy Corner - Ebony Park","email":"pnpbusycorner@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":613,"userName":"PnP Southernwood","email":"pnpsouthernwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":609,"userName":"PnP Queenstown","email":"pnpqueenstown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":605,"userName":"PnP Walker Drive","email":"pnpwalkerdrive@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":601,"userName":"PnPVincentPark","email":"pnpvincent@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":597,"userName":"PnP The Gardens","email":"pnpthegardens@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":593,"userName":"PnP Port Alfred","email":"pnpportalfred@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":589,"userName":"PNP The Workshop","email":"pnptheworkshop@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":584,"userName":"PNP Montclair","email":"pnpmontclair@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":580,"userName":"PNP  Hyper South Coast","email":"pnphypersouthcoast@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":576,"userName":"PNP Queensburgh","email":"pnpqueensburgh@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"","cluster":"","principal":"14"},{"id":787,"userName":"loretta","email":"loretta@marketing2themax.co.za","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":783,"userName":"PnP Piet Retief Church Street","email":"pnpfranchisepietretiefchurchstreet@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":779,"userName":"PnP Daveyton","email":"pnpdaveyton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":775,"userName":"PnP Letsheng Mall","email":"pnpletshengmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":771,"userName":"PnP Bedfordview","email":"pnpbedfordview@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":767,"userName":"PnP Evaton","email":"pnpevaton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":763,"userName":"PnP Hyper Soweto","email":"pnphypersoweto@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":759,"userName":"PnP Orange Farm - Eyethu Mall","email":"pnporangefarm@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":755,"userName":"PNP Waterfall Mall","email":"pnpwaterfallmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":751,"userName":"PNP Mmabatho","email":"pnpmmabatho@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":747,"userName":"PNP Franchise Brits Mall","email":"pnpfranchisebritsmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":743,"userName":"PNP Franchise Towers at Langenhoven","email":"pnpfranchisetowers@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":739,"userName":"PnP Mall At Reds","email":"pnpmallatreds@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":735,"userName":"PNP Hyper Klerksdorp","email":"pnphyperklerksdorp@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":731,"userName":"PNP Franchise Beyers Naude Rustenburg","email":"pnpfranchisebeyersnauderustenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":727,"userName":"PNP Franchise Circle Centre","email":"pnpfranchisecirclecentre@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":723,"userName":"PNP Franchise Strand Street","email":"pnpfranchisestrandstreet@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":719,"userName":"PNP Hyper Longbeach","email":"pnphyperlongbeach@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":715,"userName":"PNP Tygervalley","email":"pnptygervalley@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":711,"userName":"PNP Franchise Gordons Bay","email":"pnpfranchisegordonsbay@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":707,"userName":"PNP Franchise Vredenburg","email":"pnpfranchisevredenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":703,"userName":"PNP Franchise Parow","email":"pnpfranchiseparow@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":699,"userName":"PNP Middelburg Mall","email":"pnpmiddelburgmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":695,"userName":"PNP Franchise Lydenburg","email":"pnpfranchiselydenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":691,"userName":"PNP Franchise Standerton CBD","email":"pnpfranchisestandertoncbd@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":687,"userName":"PNP Franchise Delmas","email":"pnpfranchisedelmas@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":682,"userName":"PNP Kwagga Plaza","email":"pnpkwaggaplaza@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":678,"userName":"PNP Franchise Piet Retief","email":"pnpfranchisepietretief@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":674,"userName":"PNP Local Polokwane","email":"pnplocalpolokwane@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":670,"userName":"PNP Local Northam","email":"pnplocalnortham@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":666,"userName":"PNP Mall at Lebo","email":"pnpmallatlebo@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":662,"userName":"PNP Franchise Steelpoort","email":"pnpfranchisesteelpoort@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":658,"userName":"PnP Killarney","email":"pnpkillarney@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":654,"userName":"PNP Westwood","email":"pnpwestwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"PICK N PAY 2026","principal":"14"},{"id":650,"userName":"PNP  La Lucia","email":"pnplalucia@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":646,"userName":"PNP Franchise Newcastle","email":"pnpfranchisenewcastle@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":642,"userName":"PnP Benmore","email":"pnpbenmore@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":637,"userName":"PnP Midrand (The Boulders)","email":"pnpmidrand@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":629,"userName":"PnP Hyper Woodmead","email":"pnphyperwoodmead@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":623,"userName":"PnP Hyper Norwood","email":"pnphypernorwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":619,"userName":"PnP Tembisa","email":"pnptembisa@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":615,"userName":"PnP Summerstrand","email":"pnpsummerstrand@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":611,"userName":"PnP Umtata","email":"pnpumtata@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":607,"userName":"PnP Mthatha Mall","email":"pnpmthathamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":603,"userName":"PnP Fountains Mall","email":"pnpfountainsmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":599,"userName":"PnP Mdantsane","email":"pnpmdantsane@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":595,"userName":"PnP Linton","email":"linton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":591,"userName":"PNP Hayfields","email":"pnphayfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":586,"userName":"PNP  Empangeni","email":"pnpempangeni@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":582,"userName":"PNP  Franchise Ballito Junction","email":"pnpfranchiseballitojunction@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":578,"userName":"PNP Meer En See","email":"pnpmeerensee@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":786,"userName":"Gareth","email":"garethgobey@pnp.co.za","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":782,"userName":"PnP Vaal Mall","email":"pnpvaalmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":778,"userName":"PnP Hazelpark","email":"pnphazelpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":774,"userName":"PnP Hyper Steeledale","email":"pnphypersteeledale@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":770,"userName":"PnP Brackenhurst","email":"pnpbrackenhurst@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":766,"userName":"PnP Dobsonville Mall","email":"pnpdobsonvillemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":762,"userName":"PnP Oakfields","email":"pnpoakfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":758,"userName":"PnP Meadowlands","email":"pnpmeadowlands@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":754,"userName":"PNP Franchise Vryburg","email":"pnpfranchisevryburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":750,"userName":"PNP Loch Logan","email":"pnplochlogan@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":746,"userName":"PNP Franchise Rhodesdene","email":"pnpfranchiserhodesdene@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":742,"userName":"PNP Hyper Bloemfontein","email":"pnphyperbloemfontein@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":738,"userName":"PNP Franchise Harties","email":"pnpfranchiseharties@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":734,"userName":"PNP Franchise Brits","email":"pnpfranchisebrits@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":730,"userName":"PNP Franchise Odendaalsrus","email":"pnpfranchiseodendaalsrus@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":726,"userName":"PNP Waterstone Village","email":"pnpwaterstonevillage@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":722,"userName":"PnP Jubilee Mall","email":"pnpjubileemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":718,"userName":"PNP Hyper Brackenfell","email":"pnphyperbrackenfell@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":714,"userName":"PNP Franchise Wellington","email":"pnpfranchisewellington@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":710,"userName":"PNP Canal Walk","email":"pnpcanalwalk@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":706,"userName":"PNP Hyper Ottery","email":"pnphyperottery@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":702,"userName":"PNP Promenade","email":"pnppromenade@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":698,"userName":"PNP Franchise Witbank","email":"pnpfranchisewitbank@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":694,"userName":"PNP Franchise Secunda","email":"pnpfranchisesecunda@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":690,"userName":"PNP Ermelo","email":"pnpermelo@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":685,"userName":"PNP Franchise White River","email":"pnpfranchisewhiteriver@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":681,"userName":"PNP Hyper Witbank","email":"pnphyperwitbank@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":677,"userName":"PNP Embalenhle","email":"pnpembalenhle@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":673,"userName":"PNP Burgersfort Tubatse Crossing","email":"pnpburgersforttubatsecrossing@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":669,"userName":"PNP Franchise Lephalale Square","email":"pnpfranchiselephalalesquare@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":665,"userName":"PNP Tzaneen","email":"pnptzaneen@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":661,"userName":"PNP Franchise Cycad (Polokwane)","email":"pnpfranchisecycad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":657,"userName":"PNP Franchise Jane Furse","email":"pnpfranchisejanefurse@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":653,"userName":"PNP The Bluff","email":"pnpthebluff@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"PICK N PAY 2026","principal":"14"},{"id":649,"userName":"PNP  Pinetown","email":"pnppinetown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":645,"userName":"PnP Hyper Montana","email":"pnphypermontana@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":641,"userName":"PnP Hyper Northgate","email":"pnphypernorthgate@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":636,"userName":"PnP Hatfield","email":"pnphatfield@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":628,"userName":"PnP Summerfields - Boskruin","email":"pnpsummerfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":622,"userName":"PnP Cosmo City","email":"pnpcosmocity@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":618,"userName":"PnP Bophelong","email":"pnpbophelong@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":614,"userName":"PnP Graaff-Reinet","email":"pnpgraaffreinet@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":610,"userName":"PnP Stutterheim","email":"pnpstutterheim@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":606,"userName":"PnP Aliwal North","email":"pnpaliwalnorth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":602,"userName":"PnP Beacon Bay","email":"pnpbeaconbay@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":598,"userName":"PnP Hyper Moffat Park","email":"pnphypermoffatpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":594,"userName":"PnP Greenfields","email":"pnpgreenfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"0"},{"id":590,"userName":"PNP  Umlazi Kwa-Mnyandu Centre","email":"pnpumlazikwamnyanducentre@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":585,"userName":"PNP Musgrave Road","email":"pnpmusgraveroad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":581,"userName":"PNP  Scottburgh","email":"pnpscottburgh@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":577,"userName":"PNP Franchise Kingsburgh","email":"pnpfranchisekingsburgh@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"}];


// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --fnb-red: #E63329;
    --fnb-dark: #1A0A00;
    --fnb-amber: #F5A623;
    --fnb-green: #2DBD6E;
    --fnb-grey: #F4F4F4;
    --fnb-mid: #888;
    --fnb-white: #FFFFFF;
    --radius: 14px;
    --shadow: 0 4px 24px rgba(0,0,0,0.10);
    --shadow-lg: 0 8px 40px rgba(230,51,41,0.13);
  }

  body { font-family: 'DM Sans', sans-serif; background: #F7F3EF; color: var(--fnb-dark); }

  .app-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(160deg, #fff5f4 0%, #F7F3EF 60%, #fff 100%);
  }

  /* ── LOGIN ── */
  .login-screen {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #1A0A00 0%, #3D1A00 50%, #E63329 100%);
    padding: 24px;
  }
  .login-card {
    background: #fff;
    border-radius: 24px;
    padding: 48px 40px 40px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.35);
  }
  .login-logo-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 32px;
  }
  .login-logo-badge {
    width: 52px; height: 52px;
    background: var(--fnb-red);
    border-radius: 14px;
    display: grid; place-items: center;
    color: #fff; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px;
    letter-spacing: -1px;
    flex-shrink: 0;
  }
  .login-logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; line-height: 1.2; color: var(--fnb-dark); }
  .login-logo-text span { color: var(--fnb-red); }
  .login-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; margin-bottom: 6px; }
  .login-sub { color: var(--fnb-mid); font-size: 14px; margin-bottom: 32px; }
  .field-group { margin-bottom: 18px; }
  .field-group label { display: block; font-size: 12px; font-weight: 600; letter-spacing: .5px; text-transform: uppercase; color: #555; margin-bottom: 6px; }
  .field-group input, .field-group select {
    width: 100%;
    padding: 13px 16px;
    border: 2px solid #E8E8E8;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    transition: border-color .2s;
    background: #fafafa;
    color: var(--fnb-dark);
    outline: none;
  }
  .field-group input:focus, .field-group select:focus { border-color: var(--fnb-red); background: #fff; }
  .btn-primary {
    width: 100%;
    padding: 15px;
    background: var(--fnb-red);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: transform .15s, box-shadow .15s, background .2s;
    letter-spacing: .3px;
  }
  .btn-primary:hover { background: #c9211a; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(230,51,41,.35); }
  .btn-primary:active { transform: translateY(0); }
  .btn-primary:disabled { background: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }
  .login-error { background: #fff0ef; border: 1px solid #ffb5b0; color: #c0392b; border-radius: 8px; padding: 10px 14px; font-size: 13px; margin-bottom: 16px; }

  /* ── TOP NAV ── */
  .topnav {
    background: #fff;
    border-bottom: 2px solid #F0E8E8;
    padding: 0 28px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  .nav-brand { display: flex; align-items: center; gap: 10px; }
  .nav-badge { width: 34px; height: 34px; background: var(--fnb-red); border-radius: 8px; display: grid; place-items: center; color: #fff; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px; }
  .nav-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; }
  .nav-title span { color: var(--fnb-red); }
  .nav-right { display: flex; align-items: center; gap: 16px; }
  .nav-user { font-size: 13px; color: #666; font-weight: 500; }
  .nav-user strong { color: var(--fnb-dark); }
  .btn-logout {
    padding: 7px 16px;
    background: transparent;
    border: 2px solid #E8E8E8;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: #666;
    cursor: pointer;
    transition: all .2s;
  }
  .btn-logout:hover { border-color: var(--fnb-red); color: var(--fnb-red); }

  /* ── MAIN ── */
  .main-body { padding: 32px 24px 64px; max-width: 760px; margin: 0 auto; width: 100%; }

  .page-header { margin-bottom: 28px; }
  .page-header h1 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; margin-bottom: 4px; }
  .page-header p { color: #888; font-size: 14px; }

  /* progress bar */
  .prog-bar-wrap { background: #eee; border-radius: 99px; height: 6px; margin-bottom: 24px; overflow: hidden; }
  .prog-bar { height: 100%; background: var(--fnb-red); border-radius: 99px; transition: width .4s ease; }
  .prog-label { font-size: 12px; color: #999; margin-bottom: 8px; }

  /* ── CARD ── */
  .card {
    background: #fff;
    border-radius: var(--radius);
    padding: 28px 28px 24px;
    box-shadow: var(--shadow);
    margin-bottom: 16px;
  }
  .card-section-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: .6px;
    text-transform: uppercase;
    color: var(--fnb-red);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #F0E8E8;
  }

  /* fields */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-grid.full { grid-template-columns: 1fr; }
  @media (max-width: 540px) { .form-grid { grid-template-columns: 1fr; } }

  .f-group { display: flex; flex-direction: column; gap: 5px; }
  .f-group.span2 { grid-column: span 2; }
  @media (max-width: 540px) { .f-group.span2 { grid-column: span 1; } }
  .f-label { font-size: 12px; font-weight: 600; letter-spacing: .4px; color: #555; text-transform: uppercase; }
  .f-required { color: var(--fnb-red); margin-left: 2px; }
  .f-input, .f-select, .f-textarea {
    padding: 11px 14px;
    border: 2px solid #E8E8E8;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--fnb-dark);
    background: #fafafa;
    transition: border-color .2s, background .2s;
    outline: none;
    width: 100%;
  }
  .f-input:focus, .f-select:focus, .f-textarea:focus { border-color: var(--fnb-red); background: #fff; }
  .f-input.error, .f-select.error { border-color: #e74c3c; }
  .f-textarea { resize: vertical; min-height: 80px; }

  /* radio / checkbox groups */
  .radio-group, .checkbox-group { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
  .radio-opt, .check-opt {
    display: flex; align-items: center; gap: 7px;
    padding: 9px 14px;
    border: 2px solid #E8E8E8;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all .2s;
    user-select: none;
    background: #fafafa;
  }
  .radio-opt.selected, .check-opt.selected { border-color: var(--fnb-red); background: #fff5f4; color: var(--fnb-red); font-weight: 600; }
  .radio-opt input, .check-opt input { display: none; }
  .radio-dot {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid #ccc;
    display: grid; place-items: center;
    flex-shrink: 0;
    transition: border-color .2s;
  }
  .radio-opt.selected .radio-dot { border-color: var(--fnb-red); }
  .radio-dot::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--fnb-red); opacity: 0; transition: opacity .2s; }
  .radio-opt.selected .radio-dot::after { opacity: 1; }

  /* upload area */
  .upload-area {
    border: 2px dashed #E0D8D8;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color .2s, background .2s;
    background: #fafafa;
  }
  .upload-area:hover { border-color: var(--fnb-red); background: #fff5f4; }
  .upload-area.has-file { border-color: var(--fnb-green); background: #f0fdf6; }
  .upload-icon { font-size: 24px; margin-bottom: 6px; }
  .upload-text { font-size: 13px; color: #888; }
  .upload-text strong { color: var(--fnb-dark); }

  /* submit section */
  .submit-row { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; flex-wrap: wrap; }
  .btn-secondary {
    padding: 13px 24px;
    background: #fff;
    border: 2px solid #E8E8E8;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    color: #666;
    transition: all .2s;
  }
  .btn-secondary:hover { border-color: var(--fnb-dark); color: var(--fnb-dark); }
  .btn-submit {
    padding: 13px 32px;
    background: var(--fnb-red);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all .2s;
    display: flex; align-items: center; gap: 8px;
  }
  .btn-submit:hover { background: #c9211a; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(230,51,41,.3); }
  .btn-submit:disabled { background: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }
  .spin { display: inline-block; animation: spin .7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* success/error toast */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    padding: 14px 24px; border-radius: 12px;
    font-weight: 600; font-size: 14px; z-index: 999;
    animation: slideup .3s ease; box-shadow: 0 8px 32px rgba(0,0,0,.2);
    display: flex; align-items: center; gap: 10px; white-space: nowrap;
  }
  .toast.success { background: var(--fnb-green); color: #fff; }
  .toast.error { background: var(--fnb-red); color: #fff; }
  @keyframes slideup { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }

  /* success screen */
  .success-screen { text-align: center; padding: 60px 24px; }
  .success-icon { font-size: 64px; margin-bottom: 16px; }
  .success-screen h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px; margin-bottom: 8px; }
  .success-screen p { color: #888; font-size: 15px; margin-bottom: 28px; }
  .btn-new { padding: 13px 28px; background: var(--fnb-red); color: #fff; border: none; border-radius: 10px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all .2s; }
  .btn-new:hover { background: #c9211a; }

  /* stats bar */
  .stats-bar {
    display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;
  }
  .stat-chip {
    background: #fff;
    border: 2px solid #F0E8E8;
    border-radius: 10px;
    padding: 10px 16px;
    display: flex; flex-direction: column; gap: 2px;
  }
  .stat-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; color: var(--fnb-red); }
  .stat-lbl { font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: .4px; }

`;

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function RadioGroup({ options, value, onChange, name }) {
  return (
    <div className="radio-group">
      {options.map(opt => (
        <label
          key={opt}
          className={`radio-opt${value === opt ? " selected" : ""}`}
          onClick={() => onChange(opt)}
        >
          <span className="radio-dot" />
          {opt}
        </label>
      ))}
    </div>
  );
}

function FileUploadField({ label, fieldKey, value, onChange }) {
  const ref = useRef();
  return (
    <div className="f-group span2">
      <span className="f-label">{label}</span>
      <div
        className={`upload-area${value ? " has-file" : ""}`}
        onClick={() => ref.current.click()}
      >
        <div className="upload-icon">{value ? "✅" : "📷"}</div>
        <div className="upload-text">
          {value ? <strong>{value.name}</strong> : <><strong>Tap to upload photo</strong><br />JPG, PNG or HEIC</>}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={e => onChange(fieldKey, e.target.files[0] || null)}
        />
      </div>
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      const match = USERS.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );
      if (match) {
        onLogin(match);
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo-row">
          <div className="login-logo-badge">FNB</div>
          <div className="login-logo-text">
            <div><span>PnP FNB</span> Campaign</div>
            <div style={{ fontWeight: 400, fontSize: 12, color: "#888" }}>Promoter Survey 2026</div>
          </div>
        </div>
        <div className="login-title">Welcome back</div>
        <div className="login-sub">Sign in to capture customer interactions</div>
        {error && <div className="login-error">⚠️ {error}</div>}
        <div className="field-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="yourstore@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>
        <div className="field-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>
        <button className="btn-primary" onClick={handleLogin} disabled={loading || !email || !password}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>
        <div style={{ marginTop: 16, fontSize: 12, color: "#bbb", textAlign: "center" }}>
          M2M PicknPay FNB Campaign 2026
        </div>
      </div>
    </div>
  );
}

// ─── SURVEY FORM ─────────────────────────────────────────────────────────────
function SurveyForm({ user, onSuccess, sessionCount }) {
  const [form, setForm] = useState({
    taskType: "Customer Interaction",
    firstName: "",
    surname: "",
    contactNumber: "",
    emailAddress: "",
    currentlyFNB: "",
    fnbAccount: "",
    bankWith: "",
    uploadStorePhoto: "",
    photoUpload: null,
    promoterPhoto: null,
    fnbStaffPhoto: null,
    burgerFridayPhoto: null,
    handoverStatus: "",
    ifNoWhyNot: "",
    currentFNBUser: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setFile = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.contactNumber.trim()) e.contactNumber = true;
    if (!form.currentlyFNB) e.currentlyFNB = true;
    if (form.currentlyFNB === "Yes" && !form.fnbAccount) e.fnbAccount = true;
    if (form.currentlyFNB === "No" && !form.bankWith) e.bankWith = true;
    if (!form.handoverStatus) e.handoverStatus = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    setSubmitting(true);
    try {
      // Build row payload matching CSV columns
      const rowData = {
        survey: "PnP FNB Campaign 2026",
        record_id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        mobile_user: user.userName,
        mobile_user_role: user.role,
        mobile_user_division: user.cluster || "PickNPay Campaign 2026",
        principal: "PnP",
        "Task Type": form.taskType || "Customer Interaction",
        "First Name": form.firstName || "",
        "Surname": form.surname || "",
        "Contact number": form.contactNumber || "",
        "Email address": form.emailAddress || "",
        "Currently bank with FNB?": form.currentlyFNB || "",
        "Which account do you have": form.fnbAccount || "",
        "Selected Store": user.userName,
        "Selected Store ID": "",
        "Please provide contact number": form.contactNumber || "",
        "Which bank do you bank with?": form.bankWith || "",
        "Do you want to upload store photo?": form.uploadStorePhoto || "",
        "Handover status": form.handoverStatus || "",
        "If no, why not": form.ifNoWhyNot || "",
        "Are you a current FNB user?": form.currentFNBUser || "",
      };

      // POST directly to M2M Survey API – same URL pattern as fm.m2tmax.com
      const SURVEY = encodeURIComponent("PnP FNB Campaign 2026");
      const res = await fetch(
        `${M2M_API_URL}/api/form_master_uploads/zoho?X-Api-Key=${M2M_API_KEY}&survey=${SURVEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rowData),
        }
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.status === false) {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
      showToast("✓ Record submitted to Zoho Analytics!");
      setTimeout(() => onSuccess(), 700);
    } catch (err) {
      showToast("Submission failed: " + err.message, "error");
    }
    setSubmitting(false);
  };

  const isFNBUser = form.currentlyFNB === "Yes";
  const isNotFNBUser = form.currentlyFNB === "No";
  const handoverDone = form.handoverStatus && form.handoverStatus !== "Customer Not Interested" && form.handoverStatus !== "Customer not handed over";

  return (
    <div className="main-body">
      {/* Header */}
      <div className="page-header">
        <h1>Customer Interaction</h1>
        <p>PnP FNB Campaign 2026 · {user.userName}</p>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-chip">
          <div className="stat-num">{sessionCount}</div>
          <div className="stat-lbl">This Session</div>
        </div>
        <div className="stat-chip">
          <div className="stat-num">{user.region || "N/A"}</div>
          <div className="stat-lbl">Region</div>
        </div>
        <div className="stat-chip">
          <div className="stat-num">PnP</div>
          <div className="stat-lbl">Principal</div>
        </div>
      </div>

      {/* Section 1 - Task Type */}
      <div className="card">
        <div className="card-section-title">Task Type</div>
        <div className="f-group">
          <span className="f-label">Select Task Type <span className="f-required">*</span></span>
          <RadioGroup
            options={["Customer Interaction", "Daily Admin"]}
            value={form.taskType}
            onChange={v => set("taskType", v)}
          />
        </div>
      </div>

      {/* Section 2 - Customer Details */}
      <div className="card">
        <div className="card-section-title">Customer Details</div>
        <div className="form-grid">
          <div className="f-group">
            <span className="f-label">First Name <span className="f-required">*</span></span>
            <input
              className={`f-input${errors.firstName ? " error" : ""}`}
              placeholder="Enter first name"
              value={form.firstName}
              onChange={e => set("firstName", e.target.value)}
            />
          </div>
          <div className="f-group">
            <span className="f-label">Surname</span>
            <input
              className="f-input"
              placeholder="Enter surname"
              value={form.surname}
              onChange={e => set("surname", e.target.value)}
            />
          </div>
          <div className="f-group">
            <span className="f-label">Contact Number <span className="f-required">*</span></span>
            <input
              className={`f-input${errors.contactNumber ? " error" : ""}`}
              type="tel"
              placeholder="0XX XXX XXXX"
              value={form.contactNumber}
              onChange={e => set("contactNumber", e.target.value)}
            />
          </div>
          <div className="f-group">
            <span className="f-label">Email Address</span>
            <input
              className="f-input"
              type="email"
              placeholder="customer@email.com"
              value={form.emailAddress}
              onChange={e => set("emailAddress", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 3 - FNB Banking Status */}
      <div className="card">
        <div className="card-section-title">Banking Status</div>
        <div className="f-group" style={{ marginBottom: 18 }}>
          <span className="f-label">Are you a current FNB user? <span className="f-required">*</span></span>
          <RadioGroup
            options={["Yes", "No"]}
            value={form.currentlyFNB}
            onChange={v => { set("currentlyFNB", v); set("currentFNBUser", v); }}
          />
          {errors.currentlyFNB && <span style={{ color: "var(--fnb-red)", fontSize: 12 }}>Please select an option</span>}
        </div>

        {isFNBUser && (
          <div className="f-group">
            <span className="f-label">Which FNB Account do you have? <span className="f-required">*</span></span>
            <RadioGroup
              options={["FNB Easy", "FNB Aspire", "FNB Premier"]}
              value={form.fnbAccount}
              onChange={v => set("fnbAccount", v)}
            />
            {errors.fnbAccount && <span style={{ color: "var(--fnb-red)", fontSize: 12 }}>Please select an account</span>}
          </div>
        )}

        {isNotFNBUser && (
          <div className="f-group">
            <span className="f-label">Which bank do you bank with? <span className="f-required">*</span></span>
            <RadioGroup
              options={["Capitec", "Standard Bank", "ABSA", "Nedbank", "Tyme Bank", "African Bank", "Discovery Bank", "Bank Zero", "Old Mutual", "Investec"]}
              value={form.bankWith}
              onChange={v => set("bankWith", v)}
            />
            {errors.bankWith && <span style={{ color: "var(--fnb-red)", fontSize: 12 }}>Please select a bank</span>}
          </div>
        )}
      </div>

      {/* Section 4 - Handover */}
      <div className="card">
        <div className="card-section-title">Handover & Outcome</div>
        <div className="f-group" style={{ marginBottom: 18 }}>
          <span className="f-label">Handover Status <span className="f-required">*</span></span>
          <RadioGroup
            options={[
              "Handed Over To FNB Consultant for sign up",
              "scanned QR code on customers phone",
              "scanned QR code on promoters phone",
              "Customer Not Interested",
              "Customer not handed over",
            ]}
            value={form.handoverStatus}
            onChange={v => set("handoverStatus", v)}
          />
          {errors.handoverStatus && <span style={{ color: "var(--fnb-red)", fontSize: 12 }}>Please select handover status</span>}
        </div>

        {(form.handoverStatus === "Customer Not Interested" || form.handoverStatus === "Customer not handed over") && (
          <div className="f-group">
            <span className="f-label">If not handed over, why not?</span>
            <textarea
              className="f-textarea"
              placeholder="Explain why the customer was not handed over..."
              value={form.ifNoWhyNot}
              onChange={e => set("ifNoWhyNot", e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Section 5 - Photos */}
      <div className="card">
        <div className="card-section-title">Store Photos</div>
        <div className="f-group" style={{ marginBottom: 14 }}>
          <span className="f-label">Do you want to upload a store photo?</span>
          <RadioGroup
            options={["Yes", "No"]}
            value={form.uploadStorePhoto}
            onChange={v => set("uploadStorePhoto", v)}
          />
        </div>
        {form.uploadStorePhoto === "Yes" && (
          <div className="form-grid">
            <FileUploadField
              label="📸 Store Photo"
              fieldKey="photoUpload"
              value={form.photoUpload}
              onChange={setFile}
            />
            <FileUploadField
              label="🧑 Promoter with T-shirt & A3 Print Out"
              fieldKey="promoterPhoto"
              value={form.promoterPhoto}
              onChange={setFile}
            />
            <FileUploadField
              label="🏦 FNB Staff On Site"
              fieldKey="fnbStaffPhoto"
              value={form.fnbStaffPhoto}
              onChange={setFile}
            />
            <FileUploadField
              label="🍔 Burger Friday Set Up"
              fieldKey="burgerFridayPhoto"
              value={form.burgerFridayPhoto}
              onChange={setFile}
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="submit-row">
        <button
          className="btn-secondary"
          onClick={() => {
            setForm({
              taskType: "Customer Interaction", firstName: "", surname: "",
              contactNumber: "", emailAddress: "", currentlyFNB: "", fnbAccount: "",
              bankWith: "", uploadStorePhoto: "", photoUpload: null, promoterPhoto: null,
              fnbStaffPhoto: null, burgerFridayPhoto: null, handoverStatus: "",
              ifNoWhyNot: "", currentFNBUser: "",
            });
            setErrors({});
          }}
        >
          Clear Form
        </button>
        <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
          {submitting ? <><span className="spin">⟳</span> Submitting...</> : <>Submit Record →</>}
        </button>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────
function SuccessScreen({ onNext, user, count }) {
  return (
    <div className="main-body">
      <div className="success-screen">
        <div className="success-icon">✅</div>
        <h2>Submission Complete!</h2>
        <p>Customer interaction recorded successfully for <strong>{user.userName}</strong>.</p>
        <div className="stats-bar" style={{ justifyContent: "center", margin: "0 auto 28px" }}>
          <div className="stat-chip">
            <div className="stat-num">{count}</div>
            <div className="stat-lbl">Records Today</div>
          </div>
        </div>
        <button className="btn-new" onClick={onNext}>+ New Customer Interaction</button>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("login"); // login | survey | success
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    // Load Zoho Projects Extension SDK (plugin.js)
    if (!document.getElementById("zoho-plugin-sdk")) {
      const sdk = document.createElement("script");
      sdk.id = "zoho-plugin-sdk";
      sdk.src = "https://analytics.zoho.com/js/sdk/v1/plugin.js";
      document.head.appendChild(sdk);
    }

    return () => document.head.removeChild(style);
  }, []);

  const handleLogin = (u) => { setUser(u); setScreen("survey"); };
  const handleLogout = () => { setUser(null); setScreen("login"); setSessionCount(0); };
  const handleSuccess = () => { setSessionCount(c => c + 1); setScreen("success"); };
  const handleNext = () => setScreen("survey");

  if (screen === "login") return <div className="app-wrap"><LoginScreen onLogin={handleLogin} /></div>;

  return (
    <div className="app-wrap">
      <nav className="topnav">
        <div className="nav-brand">
          <div className="nav-badge">FNB</div>
          <div className="nav-title"><span>PnP FNB</span> Campaign 2026</div>
        </div>
        <div className="nav-right">
          <span className="nav-user">Logged in as <strong>{user.userName}</strong></span>
          <button className="btn-logout" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>
      {screen === "survey" && (
        <SurveyForm user={user} onSuccess={handleSuccess} sessionCount={sessionCount} />
      )}
      {screen === "success" && (
        <SuccessScreen onNext={handleNext} user={user} count={sessionCount} />
      )}
    </div>
  );
}
