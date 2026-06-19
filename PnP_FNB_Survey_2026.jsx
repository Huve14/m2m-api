import { useState, useEffect, useRef } from "react";

// ─── API CONFIG ────────────────────────────────────────────────────
// Update these two values after deploying the server
// Or set as Vite env vars: VITE_API_URL and VITE_API_KEY
const M2M_API_URL = import.meta.env?.VITE_API_URL || "https://m2m-api-production.up.railway.app";
const M2M_API_KEY = import.meta.env?.VITE_API_KEY || "A3F7D2E91B4C6085FE3A7D1290B4C6E8";

// ─── USER DATABASE (from User_Table.csv) ───────────────────────────────────
const USERS = [{"id":784,"userName":"PnP Franchise Vryheid","email":"pnpfranchisevryheid@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":780,"userName":"PnP Witpoortjie","email":"pnpwitpoortjie@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":776,"userName":"PnP Elspark","email":"pnpelspark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":772,"userName":"PnP Hyper Boksburg","email":"pnphyperboksburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":768,"userName":"PnP Heidelberg","email":"pnpheidelberg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":764,"userName":"PnP Diepkloof","email":"pnpdiepkloof@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":760,"userName":"PnP Protea Glen Boulevard","email":"pnpproteaglenboulevard@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":752,"userName":"PNP Moruleng","email":"pnpmoruleng@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":748,"userName":"PNP Rustenburg","email":"pnpRustenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":744,"userName":"PNP Franchise Zeerust","email":"pnpfranchisezeerust@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":740,"userName":"PNP Franchise Galeshewe","email":"pnpfranchisegaleshewe@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":736,"userName":"PNP Franchise Mafikeng","email":"pnpfranchisemafikeng@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":732,"userName":"PNP Franchise Fleurdal","email":"pnpfranchisefleurdal@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":728,"userName":"PNP Franchise Rondebosch","email":"pnpfranchiserondebosch@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":724,"userName":"PNP Tokai","email":"pnptokai@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":720,"userName":"PNP Pinelands","email":"pnppinelands@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":716,"userName":"PNP Plattekloof","email":"pnpplattekloof@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":712,"userName":"PNP Franchise Observatory","email":"pnpfranchiseobservatory@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":708,"userName":"PnP Eersterust","email":"pnpeersterust@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":704,"userName":"PNP Constantia","email":"pnpconstantia@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":700,"userName":"PNP Secunda Mall","email":"pnpsecundamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":696,"userName":"PNP Midwater - Middelburg","email":"pnpmidwatermiddelburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":692,"userName":"PNP Ilanga Mall","email":"pnpilangamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":688,"userName":"PNP Highveld Mall","email":"pnphighveldmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":683,"userName":"PNP Local Hazyview","email":"pnplocalhazyview@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":679,"userName":"PNP Kwa-Guqa - Witbank","email":"pnpkwa-guqawitbank@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":675,"userName":"PNP Savannah","email":"pnpsavannah@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":671,"userName":"PNP Franchise Modimolle","email":"pnpfranchisemodimolle@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":667,"userName":"PNP Mokopane Mall","email":"pnpmokopanemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":663,"userName":"PNP Thavhani Mall","email":"pnpthavhanimall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":659,"userName":"PNP Polokwane CBD","email":"pnppolokwanecbd@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":655,"userName":"PnP Waverley","email":"pnpwaverley@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":651,"userName":"PNP Franchise Dundee","email":"pnpfranchisedundee@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":647,"userName":"PNP Franchise Pongola","email":"pnpfranchisepongola@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":643,"userName":"PnP Garankuwa","email":"pnpgarankuwa@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":638,"userName":"PnP Hyper Faerie Glen","email":"pnphyperfaerieglen@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":630,"userName":"PnP Equestria Mall","email":"pnpequestriamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":625,"userName":"PnP Hyper Wonderpark","email":"pnphyperwonderpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":620,"userName":"PnP Kempton Square","email":"pnpkemptonsquare@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":616,"userName":"PnP Boardwalk Mall","email":"pnpboardwalkmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":612,"userName":"PnP Commercial Road","email":"pnpcommercialroad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":608,"userName":"PnP Uitenhage","email":"pnpuitenhage@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":604,"userName":"PnP Heugh Road","email":"pnpheughroad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":600,"userName":"PnP Walmer Park","email":"pnpwalmerpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":596,"userName":"PnP King Williams Town","email":"pnpkingwilliamstown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":592,"userName":"PnP Grahamstown","email":"pnpgrahamstown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":588,"userName":"PNP  Franchise The Galleria","email":"pnpfranchisethegalleria@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":583,"userName":"PNP Franchise Pioneer Park","email":"pnpfranchisepioneerpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":579,"userName":"PNP  Franchise Port Shepstone","email":"pnpfranchiseportshepstone@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":575,"userName":"PnP Hyper DBN North","email":"pnphyperdurbannorth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":785,"userName":"Colette","email":"craposo@pnp.co.za","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":781,"userName":"PnP Southgate","email":"pnpsouthgate@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":777,"userName":"PnP Mulbarton Park","email":"pnpmulbartonpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":773,"userName":"PnP Sherwood","email":"pnpsherwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":769,"userName":"PnP Hyper Greenstone","email":"pnphypergreenstone@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":765,"userName":"PnP Dobsonville","email":"pnpdobsonville@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":761,"userName":"PnP Newmarket","email":"pnpnewmarket@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":757,"userName":"PnP Jackal Creek","email":"pnpjackalcreek@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":753,"userName":"PNP Maluti Crescent","email":"pnpmaluticrescent@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":749,"userName":"PNP Franchise Preller Walk Mall","email":"pnpfranchiseprellerwalkmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":745,"userName":"PNP Franchise Kuruman","email":"pnpfranchisekuruman@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":741,"userName":"PNP Royldene","email":"pnproyldene@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":737,"userName":"PNP Franchise Songloed","email":"pnpfranchisesongloed@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":733,"userName":"PNP Franchise Azalea Park","email":"pnpfranchiseazaleapark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":729,"userName":"PNP Gardens","email":"pnpgardens@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":725,"userName":"PNP Franchise Kraaifontein (Darwin Road)","email":"pnpfranchisekraaifontein@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":721,"userName":"PnP Tshwane Mall","email":"pnptshwanemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":717,"userName":"PNP Franchise Kuils River","email":"pnpfranchisekuilsriver@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":713,"userName":"PNP Muizenburg","email":"pnpmuizenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":709,"userName":"PNP VAWaterfront","email":"pnpwaterfront@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":705,"userName":"PNP Kenilworth","email":"pnpkenilworth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":701,"userName":"PNP Franchise Nkomazi Plaza","email":"pnpfranchisenkomaziplaza@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":697,"userName":"PNP Local Hendrina","email":"pnplocalhendrina@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":693,"userName":"PNP Franchise Reyno Ridge","email":"pnpfranchisereynoridge@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":689,"userName":"PNP Franchise Standerton","email":"pnpfranchisestanderton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":684,"userName":"PNP Franchise River Crescent","email":"pnpfranchiserivercrescent@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":680,"userName":"PNP Franchise Barberton","email":"pnpfranchisebarberton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":676,"userName":"PNP Makhado","email":"pnpmakhado@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":672,"userName":"PNP Mall of the North","email":"pnpmallofthenorth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":668,"userName":"PNP Franchise Bela-Bela","email":"pnpfranchisebela-bela@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":664,"userName":"PNP Franchise Hoedspruit","email":"pnpfranchisehoedspruit@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":660,"userName":"PNP Franchise Thaba Mall","email":"pnpfranchisethabamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":656,"userName":"PnP Alex Mall","email":"pnpalexmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":652,"userName":"PnP Ferndale On Republic","email":"pnpferndaleonrepublic@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":648,"userName":"PNP Shelly Beach","email":"pnpshellybeach@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":644,"userName":"PnP Bronkhorstspruit","email":"pnpbronkhorstspruit@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":640,"userName":"PnP On Nicol","email":"pnponnicol@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":633,"userName":"PnP Douglasdale","email":"pnpdouglasdale@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":627,"userName":"PnP San Ridge Square","email":"pnpsanridgesquare@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":621,"userName":"PnP Birch Acres - Tembisa","email":"pnpbirchacres@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":617,"userName":"PnP Busy Corner - Ebony Park","email":"pnpbusycorner@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":613,"userName":"PnP Southernwood","email":"pnpsouthernwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":609,"userName":"PnP Queenstown","email":"pnpqueenstown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":605,"userName":"PnP Walker Drive","email":"pnpwalkerdrive@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":601,"userName":"PnPVincentPark","email":"pnpvincent@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":597,"userName":"PnP The Gardens","email":"pnpthegardens@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":593,"userName":"PnP Port Alfred","email":"pnpportalfred@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":589,"userName":"PNP The Workshop","email":"pnptheworkshop@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":584,"userName":"PNP Montclair","email":"pnpmontclair@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":580,"userName":"PNP  Hyper South Coast","email":"pnphypersouthcoast@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":576,"userName":"PNP Queensburgh","email":"pnpqueensburgh@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"","cluster":"","principal":"14"},{"id":787,"userName":"loretta","email":"loretta@marketing2themax.co.za","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":783,"userName":"PnP Piet Retief Church Street","email":"pnpfranchisepietretiefchurchstreet@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":779,"userName":"PnP Daveyton","email":"pnpdaveyton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":775,"userName":"PnP Letsheng Mall","email":"pnpletshengmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":771,"userName":"PnP Bedfordview","email":"pnpbedfordview@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":767,"userName":"PnP Evaton","email":"pnpevaton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":763,"userName":"PnP Hyper Soweto","email":"pnphypersoweto@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":759,"userName":"PnP Orange Farm - Eyethu Mall","email":"pnporangefarm@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":755,"userName":"PNP Waterfall Mall","email":"pnpwaterfallmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":751,"userName":"PNP Mmabatho","email":"pnpmmabatho@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":747,"userName":"PNP Franchise Brits Mall","email":"pnpfranchisebritsmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":743,"userName":"PNP Franchise Towers at Langenhoven","email":"pnpfranchisetowers@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":739,"userName":"PnP Mall At Reds","email":"pnpmallatreds@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":735,"userName":"PNP Hyper Klerksdorp","email":"pnphyperklerksdorp@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":731,"userName":"PNP Franchise Beyers Naude Rustenburg","email":"pnpfranchisebeyersnauderustenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":727,"userName":"PNP Franchise Circle Centre","email":"pnpfranchisecirclecentre@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":723,"userName":"PNP Franchise Strand Street","email":"pnpfranchisestrandstreet@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":719,"userName":"PNP Hyper Longbeach","email":"pnphyperlongbeach@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":715,"userName":"PNP Tygervalley","email":"pnptygervalley@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":711,"userName":"PNP Franchise Gordons Bay","email":"pnpfranchisegordonsbay@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":707,"userName":"PNP Franchise Vredenburg","email":"pnpfranchisevredenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":703,"userName":"PNP Franchise Parow","email":"pnpfranchiseparow@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":699,"userName":"PNP Middelburg Mall","email":"pnpmiddelburgmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":695,"userName":"PNP Franchise Lydenburg","email":"pnpfranchiselydenburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":691,"userName":"PNP Franchise Standerton CBD","email":"pnpfranchisestandertoncbd@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":687,"userName":"PNP Franchise Delmas","email":"pnpfranchisedelmas@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":682,"userName":"PNP Kwagga Plaza","email":"pnpkwaggaplaza@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":678,"userName":"PNP Franchise Piet Retief","email":"pnpfranchisepietretief@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":674,"userName":"PNP Local Polokwane","email":"pnplocalpolokwane@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":670,"userName":"PNP Local Northam","email":"pnplocalnortham@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":666,"userName":"PNP Mall at Lebo","email":"pnpmallatlebo@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":662,"userName":"PNP Franchise Steelpoort","email":"pnpfranchisesteelpoort@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":658,"userName":"PnP Killarney","email":"pnpkillarney@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":654,"userName":"PNP Westwood","email":"pnpwestwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"PICK N PAY 2026","principal":"14"},{"id":650,"userName":"PNP  La Lucia","email":"pnplalucia@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":646,"userName":"PNP Franchise Newcastle","email":"pnpfranchisenewcastle@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":642,"userName":"PnP Benmore","email":"pnpbenmore@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":637,"userName":"PnP Midrand (The Boulders)","email":"pnpmidrand@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":629,"userName":"PnP Hyper Woodmead","email":"pnphyperwoodmead@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":623,"userName":"PnP Hyper Norwood","email":"pnphypernorwood@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":619,"userName":"PnP Tembisa","email":"pnptembisa@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":615,"userName":"PnP Summerstrand","email":"pnpsummerstrand@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":611,"userName":"PnP Umtata","email":"pnpumtata@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":607,"userName":"PnP Mthatha Mall","email":"pnpmthathamall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":603,"userName":"PnP Fountains Mall","email":"pnpfountainsmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":599,"userName":"PnP Mdantsane","email":"pnpmdantsane@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":595,"userName":"PnP Linton","email":"linton@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":591,"userName":"PNP Hayfields","email":"pnphayfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":586,"userName":"PNP  Empangeni","email":"pnpempangeni@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":582,"userName":"PNP  Franchise Ballito Junction","email":"pnpfranchiseballitojunction@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":578,"userName":"PNP Meer En See","email":"pnpmeerensee@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":786,"userName":"Gareth","email":"garethgobey@pnp.co.za","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":782,"userName":"PnP Vaal Mall","email":"pnpvaalmall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":778,"userName":"PnP Hazelpark","email":"pnphazelpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":774,"userName":"PnP Hyper Steeledale","email":"pnphypersteeledale@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":770,"userName":"PnP Brackenhurst","email":"pnpbrackenhurst@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":766,"userName":"PnP Dobsonville Mall","email":"pnpdobsonvillemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":762,"userName":"PnP Oakfields","email":"pnpoakfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":758,"userName":"PnP Meadowlands","email":"pnpmeadowlands@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":754,"userName":"PNP Franchise Vryburg","email":"pnpfranchisevryburg@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":750,"userName":"PNP Loch Logan","email":"pnplochlogan@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":746,"userName":"PNP Franchise Rhodesdene","email":"pnpfranchiserhodesdene@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":742,"userName":"PNP Hyper Bloemfontein","email":"pnphyperbloemfontein@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":738,"userName":"PNP Franchise Harties","email":"pnpfranchiseharties@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":734,"userName":"PNP Franchise Brits","email":"pnpfranchisebrits@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":730,"userName":"PNP Franchise Odendaalsrus","email":"pnpfranchiseodendaalsrus@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"Inland","cluster":"PICK N PAY 2026","principal":"14"},{"id":726,"userName":"PNP Waterstone Village","email":"pnpwaterstonevillage@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":722,"userName":"PnP Jubilee Mall","email":"pnpjubileemall@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":718,"userName":"PNP Hyper Brackenfell","email":"pnphyperbrackenfell@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":714,"userName":"PNP Franchise Wellington","email":"pnpfranchisewellington@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":710,"userName":"PNP Canal Walk","email":"pnpcanalwalk@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":706,"userName":"PNP Hyper Ottery","email":"pnphyperottery@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":702,"userName":"PNP Promenade","email":"pnppromenade@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"WC","cluster":"PICK N PAY 2026","principal":"14"},{"id":698,"userName":"PNP Franchise Witbank","email":"pnpfranchisewitbank@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":694,"userName":"PNP Franchise Secunda","email":"pnpfranchisesecunda@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":690,"userName":"PNP Ermelo","email":"pnpermelo@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":685,"userName":"PNP Franchise White River","email":"pnpfranchisewhiteriver@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":681,"userName":"PNP Hyper Witbank","email":"pnphyperwitbank@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":677,"userName":"PNP Embalenhle","email":"pnpembalenhle@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"MP","cluster":"PICK N PAY 2026","principal":"14"},{"id":673,"userName":"PNP Burgersfort Tubatse Crossing","email":"pnpburgersforttubatsecrossing@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":669,"userName":"PNP Franchise Lephalale Square","email":"pnpfranchiselephalalesquare@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":665,"userName":"PNP Tzaneen","email":"pnptzaneen@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":661,"userName":"PNP Franchise Cycad (Polokwane)","email":"pnpfranchisecycad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":657,"userName":"PNP Franchise Jane Furse","email":"pnpfranchisejanefurse@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"LP","cluster":"PICK N PAY 2026","principal":"14"},{"id":653,"userName":"PNP The Bluff","email":"pnpthebluff@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"PICK N PAY 2026","principal":"14"},{"id":649,"userName":"PNP  Pinetown","email":"pnppinetown@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":645,"userName":"PnP Hyper Montana","email":"pnphypermontana@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":641,"userName":"PnP Hyper Northgate","email":"pnphypernorthgate@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":636,"userName":"PnP Hatfield","email":"pnphatfield@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":628,"userName":"PnP Summerfields - Boskruin","email":"pnpsummerfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":622,"userName":"PnP Cosmo City","email":"pnpcosmocity@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":618,"userName":"PnP Bophelong","email":"pnpbophelong@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"GP","cluster":"PICK N PAY 2026","principal":"14"},{"id":614,"userName":"PnP Graaff-Reinet","email":"pnpgraaffreinet@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":610,"userName":"PnP Stutterheim","email":"pnpstutterheim@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":606,"userName":"PnP Aliwal North","email":"pnpaliwalnorth@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":602,"userName":"PnP Beacon Bay","email":"pnpbeaconbay@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":598,"userName":"PnP Hyper Moffat Park","email":"pnphypermoffatpark@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"14"},{"id":594,"userName":"PnP Greenfields","email":"pnpgreenfields@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"EC","cluster":"PICK N PAY 2026","principal":"0"},{"id":590,"userName":"PNP  Umlazi Kwa-Mnyandu Centre","email":"pnpumlazikwamnyanducentre@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":585,"userName":"PNP Musgrave Road","email":"pnpmusgraveroad@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":581,"userName":"PNP  Scottburgh","email":"pnpscottburgh@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"},{"id":577,"userName":"PNP Franchise Kingsburgh","email":"pnpfranchisekingsburgh@gmail.com","password":"123456","role":"PickNPay Campaign 2026","region":"KZN","cluster":"","principal":"14"}];


// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --brand-red: #E63329;
    --brand-red-dark: #B81F18;
    --ink: #211A17;
    --muted: #756E6A;
    --line: #E8E2DE;
    --paper: #FFFFFF;
    --field: #F8F7F5;
    --wash: #F5F1ED;
    --mint: #E6F7EF;
    --green: #168C58;
    --amber: #F2B84B;
    --teal: #1B7C83;
    --pnp-blue: #004B73;
    --pnp-pink: #C70A54;
    --shadow: 0 18px 60px rgba(33, 26, 23, 0.10);
    --radius: 18px;
  }

  html { background: var(--wash); }
  body {
    min-width: 320px;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      linear-gradient(135deg, rgba(230, 51, 41, 0.06), transparent 42%),
      linear-gradient(180deg, #FFFFFF 0%, var(--wash) 42%, #F7F8F7 100%);
    color: var(--ink);
  }
  button, input, textarea { font: inherit; }

  .app-wrap { min-height: 100vh; display: flex; flex-direction: column; }

  .brand-lockup { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .pnp-logo {
    display: inline-flex;
    align-items: center;
    height: 48px;
    flex-shrink: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
  }
  .pnp-box {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 7px;
    color: #fff;
    font-size: 35px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
  .pnp-box.blue { background: var(--pnp-blue); }
  .pnp-box.pink { background: var(--pnp-pink); }
  .pnp-word,
  .pnp-n {
    display: inline-block;
    font-size: 39px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
  .pnp-word.pick { color: var(--pnp-blue); margin-left: 2px; margin-right: 5px; }
  .pnp-word.pay { color: var(--pnp-pink); margin-left: 2px; }
  .pnp-n { color: var(--pnp-pink); margin: 0 8px 0 2px; }
  .pnp-logo.compact { height: 38px; }
  .pnp-logo.compact .pnp-box {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    font-size: 30px;
  }
  .pnp-logo.compact .pnp-word { display: none; }
  .pnp-logo.compact .pnp-n {
    font-size: 33px;
    margin: 0 9px;
  }
  .brand-copy { min-width: 0; }
  .brand-name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .brand-sub { color: var(--muted); font-size: 12px; margin-top: 2px; }

  .login-screen {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background:
      linear-gradient(150deg, rgba(33, 26, 23, 0.94), rgba(76, 35, 30, 0.94)),
      radial-gradient(circle at 24% 18%, rgba(230, 51, 41, 0.4), transparent 32%);
  }
  .login-card {
    width: 100%;
    max-width: 440px;
    background: rgba(255, 255, 255, 0.97);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 22px;
    padding: 28px;
    box-shadow: 0 28px 90px rgba(0, 0, 0, 0.35);
  }
  .login-logo-row { margin-bottom: 30px; }
  .login-card .brand-lockup { gap: 12px; }
  .login-card .pnp-logo { height: 44px; }
  .login-card .pnp-box {
    width: 42px;
    height: 42px;
    font-size: 32px;
  }
  .login-card .pnp-word,
  .login-card .pnp-n { font-size: 35px; }
  .login-card .pnp-word.pick { margin-right: 4px; }
  .login-card .pnp-n { margin: 0 6px 0 1px; }
  .login-card .brand-name {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
  .login-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 30px;
    line-height: 1.05;
    margin-bottom: 8px;
  }
  .login-sub { color: var(--muted); font-size: 14px; margin-bottom: 26px; }
  .login-error {
    background: #FFF0EF;
    border: 1px solid #FFC4BE;
    color: var(--brand-red-dark);
    border-radius: 12px;
    padding: 11px 13px;
    font-size: 13px;
    margin-bottom: 16px;
  }
  .field-group { margin-bottom: 16px; }
  .field-group label,
  .f-label {
    display: block;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    color: #5F5753;
    margin-bottom: 8px;
  }
  .field-group input,
  .f-input,
  .f-select,
  .f-textarea {
    width: 100%;
    min-height: 48px;
    padding: 13px 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--field);
    color: var(--ink);
    font-size: 15px;
    outline: none;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  }
  .field-group input:focus,
  .f-input:focus,
  .f-select:focus,
  .f-textarea:focus {
    background: #fff;
    border-color: var(--brand-red);
    box-shadow: 0 0 0 4px rgba(230, 51, 41, 0.10);
  }
  .f-input.error, .f-select.error { border-color: var(--brand-red); background: #FFF7F6; }
  .f-textarea { resize: vertical; min-height: 110px; line-height: 1.5; }
  .f-required { color: var(--brand-red); margin-left: 2px; }
  .f-error { color: var(--brand-red-dark); font-size: 12px; font-weight: 700; margin-top: 4px; }

  .btn-primary,
  .btn-submit,
  .btn-new {
    min-height: 48px;
    border: none;
    border-radius: 14px;
    background: var(--brand-red);
    color: #fff;
    font-weight: 800;
    cursor: pointer;
    transition: transform .16s ease, box-shadow .16s ease, background .16s ease;
  }
  .btn-primary { width: 100%; padding: 0 18px; font-size: 15px; }
  .btn-primary:hover,
  .btn-submit:hover,
  .btn-new:hover {
    background: var(--brand-red-dark);
    box-shadow: 0 14px 30px rgba(230, 51, 41, 0.25);
    transform: translateY(-1px);
  }
  .btn-primary:disabled,
  .btn-submit:disabled {
    background: #C9C2BE;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }
  .btn-secondary {
    min-height: 48px;
    padding: 0 18px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background: #fff;
    color: var(--ink);
    font-weight: 800;
    cursor: pointer;
  }
  .btn-secondary:hover { border-color: var(--ink); }

  .topnav {
    position: sticky;
    top: 0;
    z-index: 100;
    min-height: 70px;
    padding: 12px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    background: rgba(255, 255, 255, 0.88);
    border-bottom: 1px solid rgba(232, 226, 222, 0.85);
    backdrop-filter: blur(18px);
  }
  .nav-brand { min-width: 0; }
  .nav-right { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .nav-user {
    max-width: 260px;
    color: var(--muted);
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .nav-user strong { color: var(--ink); }
  .btn-logout {
    min-height: 38px;
    padding: 0 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: #fff;
    color: var(--ink);
    font-weight: 800;
    cursor: pointer;
  }

  .main-body {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 28px 22px 96px;
  }
  .survey-shell {
    display: grid;
    grid-template-columns: minmax(230px, 280px) minmax(0, 1fr);
    gap: 22px;
    align-items: start;
  }
  .survey-aside {
    position: sticky;
    top: 94px;
    padding: 22px;
    border-radius: var(--radius);
    background: #fff;
    border: 1px solid rgba(232, 226, 222, 0.9);
    box-shadow: var(--shadow);
  }
  .page-header { margin-bottom: 18px; }
  .eyebrow {
    color: var(--brand-red);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .page-header h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 34px;
    line-height: 1.02;
    margin-bottom: 10px;
  }
  .page-header p { color: var(--muted); font-size: 14px; line-height: 1.45; }

  .stats-bar { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 20px; }
  .stat-chip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 58px;
    padding: 10px 12px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background: var(--field);
  }
  .stat-num {
    order: 2;
    font-family: 'Space Grotesk', sans-serif;
    color: var(--brand-red);
    font-size: 22px;
    font-weight: 700;
  }
  .stat-lbl { order: 1; color: var(--muted); font-size: 11px; font-weight: 800; text-transform: uppercase; }

  .step-panel { min-width: 0; }
  .mobile-step-header { display: none; }
  .step-tabs {
    display: grid;
    gap: 8px;
    margin-top: 22px;
  }
  .step-tab {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 42px;
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: 13px;
    background: transparent;
    color: var(--muted);
    text-align: left;
    font-weight: 800;
    cursor: pointer;
  }
  .step-tab.active { color: var(--ink); background: #FFF5F4; border-color: #FFD7D2; }
  .step-index {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: #EEE9E5;
    color: var(--muted);
    font-size: 11px;
    flex-shrink: 0;
  }
  .step-tab.active .step-index { background: var(--brand-red); color: #fff; }
  .step-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .prog-bar-wrap {
    height: 8px;
    border-radius: 999px;
    background: #EEE8E3;
    overflow: hidden;
    margin: 16px 0 4px;
  }
  .prog-bar { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--brand-red), var(--teal)); transition: width .25s ease; }
  .prog-label { color: var(--muted); font-size: 12px; font-weight: 700; }

  .card {
    background: #fff;
    border: 1px solid rgba(232, 226, 222, 0.9);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow);
  }
  .card-section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    font-family: 'Space Grotesk', sans-serif;
    color: var(--ink);
    font-size: 21px;
    font-weight: 700;
  }
  .card-section-title::before {
    content: '';
    width: 8px;
    height: 28px;
    border-radius: 999px;
    background: var(--brand-red);
    flex-shrink: 0;
  }
  .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .form-grid.full { grid-template-columns: 1fr; }
  .f-group { display: flex; flex-direction: column; gap: 0; min-width: 0; }
  .f-group + .f-group.block-gap { margin-top: 18px; }
  .f-group.span2 { grid-column: span 2; }

  .radio-group, .checkbox-group { display: flex; flex-wrap: wrap; gap: 10px; }
  .radio-opt, .check-opt {
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 46px;
    padding: 11px 14px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: #fff;
    color: var(--ink);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    transition: border-color .18s ease, background .18s ease, color .18s ease, transform .18s ease;
  }
  .radio-opt:hover, .check-opt:hover { border-color: #D1C7C0; transform: translateY(-1px); }
  .radio-opt.selected, .check-opt.selected {
    border-color: var(--brand-red);
    background: #FFF3F2;
    color: var(--brand-red-dark);
  }
  .radio-opt input, .check-opt input { display: none; }
  .radio-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #C8C0BA;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .radio-dot::after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--brand-red);
    opacity: 0;
  }
  .radio-opt.selected .radio-dot { border-color: var(--brand-red); }
  .radio-opt.selected .radio-dot::after { opacity: 1; }

  .upload-area {
    min-height: 112px;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    border: 1px dashed #CFC6C0;
    border-radius: 16px;
    background: var(--field);
    cursor: pointer;
    transition: border-color .18s ease, background .18s ease;
  }
  .upload-area:hover { border-color: var(--brand-red); background: #FFF8F7; }
  .upload-area.has-file { border-color: var(--green); background: var(--mint); }
  .upload-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: #fff;
    color: var(--brand-red);
    font-weight: 900;
    flex-shrink: 0;
  }
  .upload-text { color: var(--muted); font-size: 13px; line-height: 1.4; }
  .upload-text strong { color: var(--ink); display: block; font-size: 14px; margin-bottom: 2px; }

  .review-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .review-item {
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background: var(--field);
  }
  .review-label { color: var(--muted); font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 5px; }
  .review-value { color: var(--ink); font-size: 14px; font-weight: 700; overflow-wrap: anywhere; }

  .submit-row {
    position: sticky;
    bottom: 0;
    z-index: 80;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 16px;
    padding: 14px 0 0;
    background: linear-gradient(180deg, rgba(245, 241, 237, 0), var(--wash) 30%);
  }
  .submit-row .btn-secondary,
  .submit-row .btn-submit { flex: 1; }
  .btn-submit { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; }
  .spin { display: inline-block; animation: spin .7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .toast {
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    width: min(calc(100vw - 32px), 520px);
    padding: 14px 16px;
    border-radius: 14px;
    color: #fff;
    font-weight: 800;
    font-size: 14px;
    z-index: 999;
    box-shadow: 0 16px 40px rgba(33, 26, 23, 0.20);
    animation: slideup .25s ease;
  }
  .toast.success { background: var(--green); }
  .toast.error { background: var(--brand-red); }
  @keyframes slideup { from { opacity: 0; transform: translate(-50%, 16px); } to { opacity: 1; transform: translate(-50%, 0); } }

  .success-screen {
    max-width: 560px;
    margin: 40px auto 0;
    padding: 34px 24px;
    text-align: center;
    background: #fff;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
  .success-icon {
    width: 74px;
    height: 74px;
    margin: 0 auto 18px;
    display: grid;
    place-items: center;
    border-radius: 22px;
    background: var(--mint);
    color: var(--green);
    font-size: 36px;
    font-weight: 900;
  }
  .success-screen h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 30px;
    line-height: 1.1;
    margin-bottom: 10px;
  }
  .success-screen p { color: var(--muted); font-size: 15px; line-height: 1.5; margin-bottom: 22px; }
  .btn-new { padding: 0 22px; }

  @media (max-width: 820px) {
    .topnav { min-height: 64px; padding: 10px 14px; }
    .topnav .brand-copy { display: none; }
    .topnav .pnp-logo { height: 36px; }
    .topnav .pnp-logo .pnp-box {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      font-size: 28px;
    }
    .topnav .pnp-logo .pnp-word { display: none; }
    .topnav .pnp-logo .pnp-n {
      font-size: 31px;
      margin: 0 8px;
    }
    .nav-user { display: none; }
    .main-body { padding: 18px 14px 106px; }
    .survey-shell { display: block; }
    .survey-aside { display: none; }
    .mobile-step-header {
      display: block;
      margin-bottom: 14px;
      padding: 14px;
      border-radius: 16px;
      background: #fff;
      border: 1px solid var(--line);
    }
    .page-header h1 { font-size: 28px; }
    .mobile-step-title { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 10px; }
    .mobile-step-title strong { font-family: 'Space Grotesk', sans-serif; font-size: 18px; }
    .mobile-step-title span { color: var(--brand-red); font-weight: 900; font-size: 12px; }
    .card { padding: 18px; border-radius: 16px; box-shadow: 0 12px 40px rgba(33, 26, 23, 0.09); }
    .card-section-title { font-size: 19px; margin-bottom: 18px; }
    .form-grid { grid-template-columns: 1fr; gap: 14px; }
    .f-group.span2 { grid-column: span 1; }
    .radio-group { display: grid; grid-template-columns: 1fr; gap: 9px; }
    .radio-opt { width: 100%; border-radius: 14px; justify-content: flex-start; }
    .review-grid { grid-template-columns: 1fr; }
    .submit-row {
      position: fixed;
      left: 0;
      right: 0;
      padding: 12px 14px calc(12px + env(safe-area-inset-bottom));
      background: rgba(255, 255, 255, 0.92);
      border-top: 1px solid var(--line);
      backdrop-filter: blur(18px);
    }
    .btn-secondary, .btn-submit { min-height: 52px; }
  }

  @media (max-width: 430px) {
    .login-screen { padding: 14px; place-items: stretch; align-items: center; }
    .login-card { padding: 22px; align-self: center; }
    .login-title { font-size: 27px; }
    .btn-logout { width: 64px; padding: 0; font-size: 12px; }
    .page-header h1 { font-size: 25px; }
    .upload-area { min-height: 98px; }
  }

`;

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const SURVEY_STEPS = [
  { id: "task", label: "Task" },
  { id: "customer", label: "Customer" },
  { id: "banking", label: "Banking" },
  { id: "handover", label: "Handover" },
  { id: "photos", label: "Photos" },
  { id: "review", label: "Review" },
];

function PickNPayLogo({ compact = false }) {
  return (
    <div className={`pnp-logo${compact ? " compact" : ""}`} aria-label="Pick n Pay">
      <span className="pnp-box blue">P</span>
      <span className="pnp-word pick">ick</span>
      <span className="pnp-n">n</span>
      <span className="pnp-box pink">P</span>
      <span className="pnp-word pay">ay</span>
    </div>
  );
}

function BrandLockup({ compactLogo = false }) {
  return (
    <div className="brand-lockup">
      <PickNPayLogo compact={compactLogo} />
      <div className="brand-copy">
        <div className="brand-name">FNB Campaign 2026</div>
        <div className="brand-sub">Promoter Survey 2026</div>
      </div>
    </div>
  );
}

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
        <div className="upload-icon">{value ? "OK" : "+"}</div>
        <div className="upload-text">
          {value ? <strong>{value.name}</strong> : <><strong>{label}</strong><span>Photo not selected</span></>}
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
          <BrandLockup />
        </div>
        <div className="login-title">Welcome back</div>
        <div className="login-sub">Sign in to capture customer interactions</div>
        {error && <div className="login-error">{error}</div>}
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
          {loading ? "Signing in..." : "Sign In"}
        </button>
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
  const [activeStep, setActiveStep] = useState(0);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setFile = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const steps = form.taskType === "Daily Admin"
    ? SURVEY_STEPS
    : SURVEY_STEPS.filter(step => step.id !== "photos");
  const activeStepId = steps[activeStep]?.id || steps[0].id;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (activeStep >= steps.length) {
      setActiveStep(steps.length - 1);
    }
  }, [activeStep, steps.length]);

  const handleTaskTypeChange = (value) => {
    setForm(f => ({
      ...f,
      taskType: value,
      ...(value === "Daily Admin" ? {} : {
        uploadStorePhoto: "",
        photoUpload: null,
        promoterPhoto: null,
        fnbStaffPhoto: null,
        burgerFridayPhoto: null,
      }),
    }));
  };

  const resetForm = () => {
    setForm({
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
    setErrors({});
    setActiveStep(0);
  };

  const getStepErrors = (stepId) => {
    const e = {};
    if (stepId === "customer" || stepId === "review") {
      if (!form.firstName.trim()) e.firstName = true;
      if (!form.contactNumber.trim()) e.contactNumber = true;
    }
    if (stepId === "banking" || stepId === "review") {
      if (!form.currentlyFNB) e.currentlyFNB = true;
      if (form.currentlyFNB === "Yes" && !form.fnbAccount) e.fnbAccount = true;
      if (form.currentlyFNB === "No" && !form.bankWith) e.bankWith = true;
    }
    if (stepId === "handover" || stepId === "review") {
      if (!form.handoverStatus) e.handoverStatus = true;
    }
    return e;
  };

  const firstStepWithErrors = (e) => {
    const targetId =
      e.firstName || e.contactNumber ? "customer" :
      e.currentlyFNB || e.fnbAccount || e.bankWith ? "banking" :
      e.handoverStatus ? "handover" :
      "review";
    return Math.max(0, steps.findIndex(step => step.id === targetId));
  };

  const validateStep = (stepId = activeStepId) => {
    const e = getStepErrors(stepId);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validate = () => {
    const e = getStepErrors("review");
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setActiveStep(firstStepWithErrors(e));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(activeStepId)) {
      showToast("Please complete the required fields on this step", "error");
      return;
    }
    if (activeStepId === "handover" && form.handoverStatus === "Customer is already with FNB") {
      const reviewIdx = steps.findIndex(s => s.id === "review");
      setActiveStep(reviewIdx >= 0 ? reviewIdx : steps.length - 1);
    } else {
      setActiveStep(step => Math.min(step + 1, steps.length - 1));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep(step => Math.max(step - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      showToast("Record submitted to Zoho Analytics");
      setTimeout(() => onSuccess(), 700);
    } catch (err) {
      showToast("Submission failed: " + err.message, "error");
    }
    setSubmitting(false);
  };

  const isFNBUser = form.currentlyFNB === "Yes";
  const isNotFNBUser = form.currentlyFNB === "No";
  const isDailyAdmin = form.taskType === "Daily Admin";
  const progress = Math.round(((activeStep + 1) / steps.length) * 100);
  const reviewItems = [
    ["Task Type", form.taskType || "Not selected"],
    ["Store", user.userName],
    ["Region", user.region || "Not set"],
    ["Customer", [form.firstName, form.surname].filter(Boolean).join(" ") || "Missing"],
    ["Contact", form.contactNumber || "Missing"],
    ["FNB User", form.currentlyFNB || "Missing"],
    ["Account / Bank", form.fnbAccount || form.bankWith || "Not selected"],
    ["Handover", form.handoverStatus || "Missing"],
    ...(isDailyAdmin ? [["Photos", form.uploadStorePhoto === "Yes" ? "Selected for upload" : "No store photo"]] : []),
  ];

  return (
    <div className="main-body">
      <div className="survey-shell">
        <aside className="survey-aside">
          <div className="page-header">
            <div className="eyebrow">Live capture</div>
            <h1>Customer Interaction</h1>
            <p>PnP FNB Campaign 2026 for {user.userName}</p>
          </div>

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

          <div className="prog-bar-wrap">
            <div className="prog-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="prog-label">{progress}% complete</div>

          <div className="step-tabs">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                className={`step-tab${activeStep === index ? " active" : ""}`}
                onClick={() => setActiveStep(index)}
              >
                <span className="step-index">{index + 1}</span>
                <span className="step-title">{step.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="step-panel">
          <div className="mobile-step-header">
            <div className="mobile-step-title">
              <strong>{steps[activeStep]?.label}</strong>
              <span>{activeStep + 1} / {steps.length}</span>
            </div>
            <div className="prog-bar-wrap">
              <div className="prog-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {activeStepId === "task" && (
            <div className="card">
              <div className="card-section-title">Task Type</div>
              <div className="f-group">
                <span className="f-label">Select Task Type <span className="f-required">*</span></span>
                <RadioGroup
                  options={["Customer Interaction", "Daily Admin"]}
                  value={form.taskType}
                  onChange={handleTaskTypeChange}
                />
              </div>
            </div>
          )}

          {activeStepId === "customer" && (
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
                  {errors.firstName && <span className="f-error">First name is required</span>}
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
                  {errors.contactNumber && <span className="f-error">Contact number is required</span>}
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
          )}

          {activeStepId === "banking" && (
            <div className="card">
              <div className="card-section-title">Banking Status</div>
              <div className="f-group">
                <span className="f-label">Are you a current FNB user? <span className="f-required">*</span></span>
                <RadioGroup
                  options={["Yes", "No"]}
                  value={form.currentlyFNB}
                  onChange={v => { set("currentlyFNB", v); set("currentFNBUser", v); }}
                />
                {errors.currentlyFNB && <span className="f-error">Select Yes or No</span>}
              </div>

              {isFNBUser && (
                <div className="f-group block-gap">
                  <span className="f-label">Which FNB Account do you have? <span className="f-required">*</span></span>
                  <RadioGroup
                    options={["FNB Easy", "FNB Aspire", "FNB Premier"]}
                    value={form.fnbAccount}
                    onChange={v => set("fnbAccount", v)}
                  />
                  {errors.fnbAccount && <span className="f-error">Select an account</span>}
                </div>
              )}

              {isNotFNBUser && (
                <div className="f-group block-gap">
                  <span className="f-label">Which bank do you bank with? <span className="f-required">*</span></span>
                  <RadioGroup
                    options={["Capitec", "Standard Bank", "ABSA", "Nedbank", "Tyme Bank", "African Bank", "Discovery Bank", "Bank Zero", "Old Mutual", "Investec"]}
                    value={form.bankWith}
                    onChange={v => set("bankWith", v)}
                  />
                  {errors.bankWith && <span className="f-error">Select a bank</span>}
                </div>
              )}
            </div>
          )}

          {activeStepId === "handover" && (
            <div className="card">
              <div className="card-section-title">Handover & Outcome</div>
              <div className="f-group">
                <span className="f-label">Handover Status <span className="f-required">*</span></span>
                <RadioGroup
                  options={[
                    "Handed Over To FNB Consultant for sign up",
                    "scanned QR code on customers phone",
                    "scanned QR code on promoters phone",
                    "Customer Not Interested",
                    "Customer not handed over",
                    "Customer is already with FNB",
                  ]}
                  value={form.handoverStatus}
                  onChange={v => set("handoverStatus", v)}
                />
                {errors.handoverStatus && <span className="f-error">Select handover status</span>}
              </div>

              {form.handoverStatus === "Customer is already with FNB" && (
                <div className="f-group block-gap" style={{ background: "#fef3f2", border: "1px solid #e8c5c0", borderRadius: 8, padding: 16 }}>
                  <span className="f-label" style={{ color: "#b71c1c", fontWeight: 600 }}>Customer already with FNB</span>
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: "#555" }}>
                    This customer is already an FNB client. No further handover is required.
                  </p>
                </div>
              )}

              {(form.handoverStatus === "Customer Not Interested" || form.handoverStatus === "Customer not handed over") && (
                <div className="f-group block-gap">
                  <span className="f-label">If not handed over, why not?</span>
                  <textarea
                    className="f-textarea"
                    placeholder="Explain why the customer was not handed over"
                    value={form.ifNoWhyNot}
                    onChange={e => set("ifNoWhyNot", e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {activeStepId === "photos" && isDailyAdmin && (
            <div className="card">
              <div className="card-section-title">Store Photos</div>
              <div className="f-group">
                <span className="f-label">Upload store photos?</span>
                <RadioGroup
                  options={["Yes", "No"]}
                  value={form.uploadStorePhoto}
                  onChange={v => set("uploadStorePhoto", v)}
                />
              </div>
              {form.uploadStorePhoto === "Yes" && (
                <div className="form-grid" style={{ marginTop: 16 }}>
                  <FileUploadField
                    label="Store Photo"
                    fieldKey="photoUpload"
                    value={form.photoUpload}
                    onChange={setFile}
                  />
                  <FileUploadField
                    label="Promoter with T-shirt and A3 Print Out"
                    fieldKey="promoterPhoto"
                    value={form.promoterPhoto}
                    onChange={setFile}
                  />
                  <FileUploadField
                    label="FNB Staff On Site"
                    fieldKey="fnbStaffPhoto"
                    value={form.fnbStaffPhoto}
                    onChange={setFile}
                  />
                  <FileUploadField
                    label="Burger Friday Set Up"
                    fieldKey="burgerFridayPhoto"
                    value={form.burgerFridayPhoto}
                    onChange={setFile}
                  />
                </div>
              )}
            </div>
          )}

          {activeStepId === "review" && (
            <div className="card">
              <div className="card-section-title">Review Record</div>
              <div className="review-grid">
                {reviewItems.map(([label, value]) => (
                  <div className="review-item" key={label}>
                    <div className="review-label">{label}</div>
                    <div className="review-value">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="submit-row">
            <button
              className="btn-secondary"
              type="button"
              onClick={activeStep === 0 ? resetForm : handleBack}
            >
              {activeStep === 0 ? "Clear" : "Back"}
            </button>
            {activeStep < steps.length - 1 ? (
              <button className="btn-submit" type="button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className="btn-submit" type="button" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <><span className="spin">...</span>Submitting</> : "Submit Record"}
              </button>
            )}
          </div>
        </div>
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
        <div className="success-icon">OK</div>
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
          <BrandLockup />
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
