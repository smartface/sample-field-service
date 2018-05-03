define({"oj-message":{fatal:"Fatal",error:"Eroare",warning:"Avertisment",info:"Informaţii",confirmation:"Confirmare","compact-type-summary":"{0}: {1}"},"oj-converter":{summary:"Valoarea nu este în formatul aşteptat.",detail:"Introduceţi o valoare în formatul aşteptat.","plural-separator":", ",hint:{summary:"Exemplu: {exampleValue}",detail:"Introduceţi o valoare în acelaşi format ca în acest exemplu: '{exampleValue}'","detail-plural":"Introduceţi o valoare în acelaşi format ca în aceste exemple: '{exampleValue}'"},
optionHint:{detail:"O valoare acceptată pt. opţiunea '{propertyName}' este '{propertyValueValid}'.","detail-plural":"Valorile acceptate pt. opţiunea '{propertyName}' sunt '{propertyValueValid}'."},optionTypesMismatch:{summary:"Este obligatorie o valoare pt. opţiunea '{requiredPropertyName}' când opţiunea '{propertyName}' este setată la '{propertyValue}'."},optionTypeInvalid:{summary:"Nu a fost specificată o valoare de tipul aşteptat pt. opţiunea '{propertyName}'."},optionOutOfRange:{summary:"Valoarea {propertyValue} este în afara intervalului pt. opţiunea '{propertyName}'."},
optionValueInvalid:{summary:"A fost specificată o valoare nevalidă, '{propertyValue}', pt. opţiunea '{propertyName}'."},number:{decimalFormatMismatch:{summary:"'{value}' nu este în formatul numeric aşteptat."},decimalFormatUnsupportedParse:{summary:"decimalFormat: 'short' şi 'long' nu sunt acceptate pt. interpretare de către convertor.",detail:"Schimbaţi componenta la readOnly. Câmpurile readOnly nu apelează funcţia de interpretare a convertorului."},currencyFormatMismatch:{summary:"'{value}' nu este în formatul de monedă aşteptat."},
percentFormatMismatch:{summary:"'{value}' nu este în formatul procentual aşteptat."}},datetime:{datetimeOutOfRange:{summary:"Valoarea '{value}' este în afara intervalului pt. '{propertyName}'.",detail:"Introduceţi o valoare cuprinsă între '{minValue}' şi '{maxValue}'.",hour:"oră",minute:"minut",second:"secundă",millisec:"milisecundă",month:"lună",day:"zi",year:"an","month name":"nume lună",weekday:"zi din săptămână"},dateFormatMismatch:{summary:"'{value}' nu este în formatul de dată aşteptat."},invalidTimeZoneID:{summary:"A fost furnizat un ID {timeZoneID} de fus orar nevalid."},
nonExistingTime:{summary:"Ora de intrare nu există, deoarece este în timpul tranziţiei la ora de vară."},missingTimeZoneData:{summary:"Datele pt. TimeZone lipsesc. Apelaţi require 'ojs/ojtimezonedata' pt. a încărca datele TimeZone."},timeFormatMismatch:{summary:"'{value}' nu este în formatul de oră aşteptat."},datetimeFormatMismatch:{summary:"'{value}' nu este în formatul de dată şi oră aşteptat."},dateToWeekdayMismatch:{summary:"Ziua '{date}' nu cade într-o '{weekday}'.",detail:"Introduceţi o zi a săptămânii care să corespundă cu data."},
invalidISOString:{summary:"Valoarea '{isoStr}' specificată nu este un şir ISO 8601 valid.",detail:"Furnizaţi un şir ISO 8601 valid."}}},"oj-validator":{length:{hint:{min:"Introduceţi minim {min} caractere.",max:"Introduceţi maxim {max} caractere.",inRange:"Introduceţi minim {min} caractere, până la maxim {max}.",exact:"Introduceţi {length} caractere."},messageDetail:{tooShort:"Introduceţi minim {min}, nu mai puţine.",tooLong:"Introduceţi maxim {max} caractere, nu mai multe."},messageSummary:{tooShort:"Există prea puţine caractere.",
tooLong:"Sunt prea multe caractere."}},range:{number:{hint:{min:"Introduceţi un număr mai mare decât sau egal cu {min}.",max:"Introduceţi un număr mai mic sau egal cu {max}.",inRange:"Introduceţi un număr cuprins între {min} şi {max}.",exact:"Introduceţi numărul {num}."},messageDetail:{rangeUnderflow:"Numărul trebuie să fie mai mare decât sau egal cu {min}.",rangeOverflow:"Numărul trebuie să fie mai mic decât sau egal cu {max}.",exact:"Numărul trebuie să fie {num}."},messageSummary:{rangeUnderflow:"Numărul este prea mic.",
rangeOverflow:"Numărul este prea mare."}},datetime:{hint:{min:"Introduceţi o dată şi o oră la sau după {min}.",max:"Introduceţi o dată şi o oră la sau înainte de {max}.",inRange:"Introduceţi o dată şi o oră cuprinse între {min} şi {max}."},messageDetail:{rangeUnderflow:"Data şi ora trebuie să coincidă sau să fie ulterioare {min}.",rangeOverflow:"Data şi ora trebuie să coincidă sau să fie anterioare {max}."},messageSummary:{rangeUnderflow:"Data şi ora sunt anterioare datei şi orei minime.",rangeOverflow:"Data şi ora sunt ulterioare datei şi orei maxime."}},
date:{hint:{min:"Introduceţi o dată identică sau ulterioară {min}.",max:"Introduceţi o dată identică sau anterioară {max}.",inRange:"Introduceţi o dată între {min} şi {max}."},messageDetail:{rangeUnderflow:"Data trebuie să coincidă sau să fie ulterioară {min}.",rangeOverflow:"Data trebuie să coincidă sau să fie anterioară {max}."},messageSummary:{rangeUnderflow:"Data este anterioară datei minime.",rangeOverflow:"Data este ulterioară datei maxime."}},time:{hint:{min:"Introduceţi o oră identică sau ulterioară {min}.",
max:"Introduceţi o oră identică sau anterioară {max}.",inRange:"Introduceţi o oră între {min} şi {max}."},messageDetail:{rangeUnderflow:"Ora trebuie să coincidă sau să fie ulterioară {min}.",rangeOverflow:"Ora trebuie să coincidă sau să fie anterioară {max}."},messageSummary:{rangeUnderflow:"Ora este anterioară orei minime.",rangeOverflow:"Ora este ulterioară orei maxime."}}},restriction:{date:{messageSummary:"Data {value} este a unei intrări dezactivate.",messageDetail:"Data {value} nu trebuie să fie a unei intrări dezactivate."}},
regExp:{summary:"Formatul este incorect.",detail:"Valoarea '{value}' trebuie să corespundă acestui tipar: '{pattern}'"},required:{summary:"Valoarea este obligatorie.",detail:"Trebuie să introduceţi o valoare."}},"oj-ojInputDate":{done:"Finalizare",cancel:"Anulare",prevText:"Înapoi",nextText:"Înainte",currentText:"Astăzi",weekHeader:"Săpt.",tooltipCalendar:"Selectare dată",tooltipCalendarTime:"Selectare dată şi oră",tooltipCalendarDisabled:"Selectare dată dezactivată",tooltipCalendarTimeDisabled:"Selectare dată şi oră dezactivată\n",
picker:"Selector",weekText:"Săptămână",datePicker:"Selector de dată",inputHelp:"Apăsaţi tasta Down sau Up pt. a accesa calendarul",inputHelpBoth:"Apăsaţi tasta Down sau Up pt. a accesa calendarul şi Shift + tasta Down ori Shift + tasta Up pt. a accesa meniul derulantă pt. oră",dateTimeRange:{hint:{min:"",max:"",inRange:""},messageDetail:{rangeUnderflow:"",rangeOverflow:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}},dateRestriction:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojInputTime":{cancelText:"Anulare",
okText:"OK",currentTimeText:"Acum",hourWheelLabel:"Oră",minuteWheelLabel:"Minut",ampmWheelLabel:"AM/PM",tooltipTime:"Selectare oră",tooltipTimeDisabled:"Selectare oră dezactivată",inputHelp:"Apăsaţi tasta Down sau Up pt. a accesa meniul derulant pt. oră",dateTimeRange:{hint:{min:"",max:"",inRange:""},messageDetail:{rangeUnderflow:"",rangeOverflow:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}}},"oj-inputBase":{required:{hint:"",messageSummary:"",messageDetail:""},regexp:{messageSummary:"",
messageDetail:""}},"oj-ojInputPassword":{regexp:{messageDetail:"Valoarea trebuie să corespundă acestui tipar: '{pattern}'"}},"oj-ojFilmStrip":{labelAccArrowNextPage:"Pagina următoare",labelAccArrowPreviousPage:"Pagina anterioară",tipArrowNextPage:"Înainte",tipArrowPreviousPage:"Înapoi"},"oj-ojDataGrid":{accessibleSortAscending:"{id} - Sortate în ordine crescătoare",accessibleSortDescending:"{id} Sortate în ordine descendentă",accessibleActionableMode:"Intraţi un modul pt. efectuarea acţiunilor",accessibleNavigationMode:"Intraţi în modul Navigare, apăsaţi F2 pt. a intra în modul Editare sau în modul pt. efectuarea acţiunilor",
accessibleEditableMode:"Intraţi în modul Editabil, apăsaţi Escape pt. a naviga în afara grilei de date",accessibleSummaryExact:"Aceasta este o grilă de date cu {rownum} rânduri şi {colnum} coloane",accessibleSummaryEstimate:"Aceasta este o grilă de date cu un număr necunoscut de rânduri şi coloane",accessibleSummaryExpanded:"Momentan există {num} rânduri extinse",accessibleRowExpanded:"Rând extins",accessibleRowCollapsed:"Rând restrâns",accessibleRowSelected:"Rândul {row} a fost selectat",accessibleColumnSelected:"Coloana {column} a fost selectată",
accessibleStateSelected:"selectat",accessibleMultiCellSelected:"{num} celule au fost selectate",accessibleRowContext:"Rândul {index}",accessibleColumnContext:"Coloana {index}",accessibleRowHeaderContext:"Antet rând {index}",accessibleColumnHeaderContext:"Antet coloană {index}",accessibleRowEndHeaderContext:"Antet final rând {index}",accessibleColumnEndHeaderContext:"Antet final coloană {index}",accessibleLevelContext:"Nivelul {level}",accessibleRangeSelectModeOn:"Modul Adăugare interval de celule activat",
accessibleRangeSelectModeOff:"Modul Adăugare interval de celule dezactivat",accessibleFirstRow:"Aţi ajuns la primul rând",accessibleLastRow:"Aţi ajuns la ultimul rând",accessibleFirstColumn:"Aţi ajuns la prima coloană",accessibleLastColumn:"Aţi ajuns la ultima coloană",accessibleSelectionAffordanceTop:"Tratare selecţie de nivel zero",accessibleSelectionAffordanceBottom:"Tratare selecţie de nivel inferior",msgFetchingData:"Se preiau datele...",msgNoData:"Nu există niciun element de afişat.",labelResize:"Redimensionare",
labelResizeWidth:"Redimensionare lăţime",labelResizeHeight:"Redimensionare înălţime",labelSortRow:"Sortare rânduri",labelSortRowAsc:"Sortare rânduri în ordine crescătoare",labelSortRowDsc:"Sortare rânduri în ordine descrescătoare",labelSortCol:"Sortare coloană",labelSortColAsc:"Sortare coloane în ordine crescătoare",labelSortColDsc:"Sortare coloane în ordine descrescătoare",labelCut:"Decupare",labelPaste:"Lipire",labelEnableNonContiguous:"Activare selectare necontiguă",labelDisableNonContiguous:"Dezactivare selectare necontiguă",
labelResizeDialogSubmit:"OK"},"oj-ojRowExpander":{accessibleLevelDescription:"Nivelul {level}",accessibleRowDescription:"Nivelul {level}, rândul {num} din {total}",accessibleRowExpanded:"Rând extins",accessibleRowCollapsed:"Rând restrâns",accessibleStateExpanded:"extins",accessibleStateCollapsed:"restrâns"},"oj-ojListView":{msgFetchingData:"Se preiau datele...",msgNoData:"Nu există niciun element de afişat.",indexerCharacters:"A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z",accessibleReorderTouchInstructionText:"Atingeţi de 2 ori şi menţineţi. Aşteptaţi sunetul şi apoi trageţi pt. a rearanja.",
accessibleReorderBeforeItem:"Înainte de {item}",accessibleReorderAfterItem:"După {item}",accessibleReorderInsideItem:"În {item}",accessibleNavigateSkipItems:"Se omit {numSkip} elemente",labelCut:"Decupare",labelCopy:"Copiere",labelPaste:"Lipire",labelPasteBefore:"Lipire înainte",labelPasteAfter:"Lipire după"},"oj-_ojLabel":{tooltipHelp:"Asistenţă",tooltipRequired:"Obligatoriu"},"oj-ojInputNumber":{required:{hint:"",messageSummary:"",messageDetail:""},numberRange:{hint:{min:"",max:"",inRange:"",exact:""},
messageDetail:{rangeUnderflow:"",rangeOverflow:"",exact:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}},tooltipDecrement:"Micşorare",tooltipIncrement:"Mărire"},"oj-ojTable":{labelAccSelectionAffordanceTop:"Tratare selecţie de nivel zero",labelAccSelectionAffordanceBottom:"Tratare selecţie de nivel inferior",labelEnableNonContiguousSelection:"Activare selectare necontiguă",labelDisableNonContiguousSelection:"Dezactivare selectare necontiguă",labelSelectRow:"Selectare rând",labelEditRow:"Editare rând",
labelSelectAndEditRow:"Selectare şi editare rând",labelSelectColumn:"Selectare coloană",labelSort:"Sortare",labelSortAsc:"Sortare în ordine crescătoare",labelSortDsc:"Sortare în ordine descrescătoare",msgFetchingData:"Se preiau datele...",msgNoData:"Nu există date de afişat.",msgInitializing:"Se iniţializează...",msgStatusSortAscending:"{0} - Sortate în ordine crescătoare.",msgStatusSortDescending:"{0} Sortate în ordine descendentă."},"oj-ojTabs":{labelCut:"Decupare",labelPasteBefore:"Lipire înainte",
labelPasteAfter:"Lipire după",labelRemove:"Eliminare",labelReorder:"Reordonare",removeCueText:"Eliminabil"},"oj-ojCheckboxset":{required:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojRadioset":{required:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojSelect":{required:{hint:"",messageSummary:"",messageDetail:""},searchField:"Câmp de căutare",noMatchesFound:"Nu a fost găsită nici o corespondenţă",oneMatchesFound:"A fost găsită o corespondenţă",moreMatchesFound:"{num} corespondenţe găsite"},
"oj-ojSwitch":{SwitchON:"Activat",SwitchOFF:"Dezactivat"},"oj-ojCombobox":{required:{hint:"",messageSummary:"",messageDetail:""},noMatchesFound:"Nu a fost găsită nici o corespondenţă"},"oj-ojInputSearch":{required:{hint:"",messageSummary:"",messageDetail:""},noMatchesFound:"Nu a fost găsită nici o corespondenţă",oneMatchesFound:"A fost găsită o corespondenţă",moreMatchesFound:"{num} corespondenţe găsite"},"oj-ojTree":{stateLoading:"Se încarcă...",labelNewNode:"Nod nou",labelMultiSelection:"Selecţie multiplă",
labelEdit:"Editare",labelCreate:"Creare",labelCut:"Decupare",labelCopy:"Copiere",labelPaste:"Lipire",labelPasteAfter:"Lipire după",labelPasteBefore:"Lipire înainte",labelRemove:"Eliminare",labelRename:"Redenumire",labelNoData:"Nu există date"},"oj-ojPagingControl":{labelAccPaging:"Paginare",labelAccNavFirstPage:"Prima pagină",labelAccNavLastPage:"Ultima pagină",labelAccNavNextPage:"Pagina următoare",labelAccNavPreviousPage:"Pagina anterioară",labelAccNavPage:"Pagina",labelLoadMore:"Afişare mai multe...",
labelLoadMoreMaxRows:"S-a atins limita maximă de {maxRows} rânduri",labelNavInputPage:"Pagina",labelNavInputPageMax:"din {pageMax}",msgItemRangeCurrent:"{pageFrom}-{pageTo}",msgItemRangeCurrentSingle:"{pageFrom}",msgItemRangeOf:"din",msgItemRangeOfAtLeast:"din cel puţin",msgItemRangeOfApprox:"din aprox.",msgItemRangeItems:"elemente",tipNavInputPage:"Deplasare la pagina",tipNavPageLink:"Accesaţi pagina {pageNum}",tipNavNextPage:"Înainte",tipNavPreviousPage:"Înapoi",tipNavFirstPage:"Prima",tipNavLastPage:"Ultima",
pageInvalid:{summary:"Valoarea introdusă pt. pagină este nevalidă.",detail:"Introduceţi o valoare mai mare ca zero."},maxPageLinksInvalid:{summary:"Valoarea pt. maxPageLinks este nevalidă.",detail:"Introduceţi o valoare mai mare ca 4."}},"oj-ojMasonryLayout":{labelCut:"Decupare",labelPasteBefore:"Lipire înainte",labelPasteAfter:"Lipire după"},"oj-panel":{labelAccButtonExpand:"Extindere",labelAccButtonCollapse:"Restrângere",labelAccButtonRemove:"Eliminare"},"oj-ojChart":{labelDefaultGroupName:"Grup {0}",
labelSeries:"Serie",labelGroup:"Grup",labelDate:"Data",labelValue:"Valoare",labelTargetValue:"Valoare vizată",labelX:"X",labelY:"Y",labelZ:"Z",labelPercentage:"Procentaj",labelLow:"Scăzut",labelHigh:"Ridicat",labelOpen:"Deschidere",labelClose:"Închidere",labelVolume:"Volum",labelQ1:"Q1",labelQ2:"Q2",labelQ3:"Q3",labelMin:"Min.",labelMax:"Max.",labelOther:"Altele",tooltipPan:"Panoramare",tooltipSelect:"Selectare cadru de selecţie",tooltipZoom:"Zoom cadru de selecţie",componentName:"Diagramă"},"oj-dvtBaseGauge":{componentName:"Indicator de calibrare"},
"oj-ojDiagram":{promotedLink:"{0} legătură",promotedLinks:"{0} legături",promotedLinkAriaDesc:"Indirect",componentName:"Diagramă"},"oj-ojGantt":{componentName:"Diagramă Gantt",accessibleDurationDays:"{0} zile",accessibleDurationHours:"{0} ore",accessibleTaskInfo:"Ora iniţială este {0}, ora finală este {1}, durata este {2}",accessibleMilestoneInfo:"Ora este {0}",accessibleRowInfo:"Rândul {0}",accessiblePredecessorInfo:"{0} predecesori",accessibleSuccessorInfo:"{0} succesori",accessibleDependencyInfo:"Tipul de dependenţă {0} conectează {1} la {2}",
startStartDependencyAriaDesc:"început - început",startFinishDependencyAriaDesc:"început - finalizare",finishStartDependencyAriaDesc:"finalizare - început",finishFinishDependencyAriaDesc:"finalizare - finalizare",tooltipZoomIn:"Mărire",tooltipZoomOut:"Micşorare",labelRow:"Rând",labelStart:"Început",labelEnd:"Sfârşit",labelLabel:"Etichetă"},"oj-ojLegend":{componentName:"Legendă"},"oj-ojNBox":{highlightedCount:"{0}/{1}",labelOther:"Altele",labelGroup:"Grup",labelSize:"Dimensiune",labelAdditionalData:"Date suplimentare",
componentName:"Nr. de casete"},"oj-ojPictoChart":{componentName:"Diagramă imagine"},"oj-ojSparkChart":{componentName:"Diagramă"},"oj-ojSunburst":{labelColor:"Culoare",labelSize:"Dimensiune",tooltipExpand:"Extindere",tooltipCollapse:"Restrângere",componentName:"Diagramă radială"},"oj-ojTagCloud":{componentName:"Nor de etichete"},"oj-ojThematicMap":{componentName:"Hartă tematică"},"oj-ojTimeAxis":{componentName:"Axă temporală"},"oj-ojTimeline":{componentName:"Cronologie",accessibleItemDesc:"Descrierea este {0}.",
accessibleItemEnd:"Ora finală este {0}.",accessibleItemStart:"Ora iniţială este {0}.",accessibleItemTitle:"Titlul este {0}.",labelSeries:"Serie",tooltipZoomIn:"Mărire",tooltipZoomOut:"Micşorare"},"oj-ojTreemap":{labelColor:"Culoare",labelSize:"Dimensiune",tooltipIsolate:"Izolare",tooltipRestore:"Restabilire",componentName:"Hartă arbore"},"oj-dvtBaseComponent":{labelScalingSuffixThousand:"mii",labelScalingSuffixMillion:"milioane",labelScalingSuffixBillion:"miliarde",labelScalingSuffixTrillion:"trilioane",
labelScalingSuffixQuadrillion:"cvadrilioane",labelInvalidData:"Date nevalide",labelNoData:"Nu există date de afişat",labelClearSelection:"Golire selecţie",labelDataVisualization:"Vizualizare date",stateSelected:"Selectat",stateUnselected:"Neselectat",stateMaximized:"Maximizat",stateMinimized:"Minimizat",stateExpanded:"Extins",stateCollapsed:"Restrâns",stateIsolated:"Izolat",stateHidden:"Ascuns",stateVisible:"Vizibil",stateDrillable:"Se poate detalia",labelAndValue:"{0}: {1}",labelCountWithTotal:"{0} din {1}"},
"oj-ojNavigationList":{defaultRootLabel:"Listă de navigare",hierMenuBtnLabel:"Butonul Meniu ierarhic",selectedLabel:"selectat",previousIcon:"Înapoi",msgFetchingData:"Se preiau datele...",msgNoData:"Nu există niciun element de afişat.",overflowItemLabel:"Mai multe"},"oj-ojSlider":{noValue:"ojSlider nu are nicio valoare",maxMin:"Valoarea maximă nu trebuie să fie mai mică decât cea minimă",valueRange:"Valoarea trebuie să se încadreze în intervalul dintre valorile min. - max.",optionNum:"Opţiunea {option} nu este număr",
invalidStep:"Pas nevalid; pasul trebuie să fie > 0"},"oj-ojDialog":{labelCloseIcon:"Închidere"},"oj-ojPopup":{ariaLiveRegionInitialFocusFirstFocusable:"Se intră în pop-up. Apăsaţi F6 pt. a naviga între pop-up şi controlul asociat.",ariaLiveRegionInitialFocusNone:"Pop-upul a fost deschis. Apăsaţi F6 pt. a naviga între pop-up şi controlul asociat.",ariaLiveRegionInitialFocusFirstFocusableTouch:"Se intră în pop-up. Pop-upul poate fi închis navigând la ultimul link din pop-up.",ariaLiveRegionInitialFocusNoneTouch:"Pop-up deschis. Navigaţi la următorul link pt. a stabili focalizarea în pop-up.",
ariaFocusSkipLink:"Atingeţi de 2 ori pt. a naviga la pop-upul deschis.",ariaCloseSkipLink:"Atingeţi de 2 ori pt. a închide pop-upul deschis."},"oj-pullToRefresh":{ariaRefreshLink:"Activare link pt. reîmprospătare conţinut",ariaRefreshingLink:"Se reîmprospătează conţinutul",ariaRefreshCompleteLink:"Reîmprospătarea a fost finalizată"},"oj-ojIndexer":{indexerCharacters:"A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z",indexerOthers:"#",ariaDisabledLabel:"Niciun antet de grup corespunzător",ariaOthersLabel:"număr",
ariaInBetweenText:"Între {first} şi {second}",ariaKeyboardInstructionText:"Apăsaţi Enter pt. a selecta valoarea.",ariaTouchInstructionText:"Atingeţi de două ori şi menţineţi apăsat pt. a intra în modul Gesturi, apoi trageţi în sus sau în jos pt. a ajuta valoarea."},"oj-ojMenu":{labelCancel:"Anulare"},"oj-ojColorSpectrum":{labelHue:"Nuanţă",labelOpacity:"Opacitate",labelSatLum:"Saturaţie/Luminanţă",labelThumbDesc:"Glisor cu patru direcţii pt. spectrul de culori."},"oj-ojColorPalette":{labelNone:"Niciunul"},
"oj-ojColorPicker":{labelSwatches:"Specimene",labelCustomColors:"Culori personalizate",labelPrevColor:"Culoarea anterioară",labelDefColor:"Culoare prestabilită",labelDelete:"Ştergere",labelDeleteQ:"Ştergeţi?",labelAdd:"Adăugare",labelAddColor:"Adăugare culoare",labelMenuHex:"HEX",labelMenuRgba:"RGBa",labelMenuHsla:"HSLa",labelSliderHue:"Nuanţă",labelSliderSaturation:"Saturaţie",labelSliderSat:"Sat.",labelSliderLightness:"Strălucire",labelSliderLum:"Luminozitate",labelSliderAlpha:"Alpha",labelOpacity:"Opacitate",
labelSliderRed:"Roşu",labelSliderGreen:"Verde",labelSliderBlue:"Albastru"}});