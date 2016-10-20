import { delay, takeEvery } from 'redux-saga'
import { call, put, take,fork } from 'redux-saga/effects'
import * as actionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
// import chrome from 'chromedriver'

import * as actions from '../actions/actions'


export function fetchPostsApi(data) {
  return fetch(`http://localhost:8080/login` )
      .then(response => response.json() )
      .then(json => json.data.children.map(child => child.data) )
}
export function sendToBG(msg){
  return chrome.runtime.sendMessage(msg);
}

export function* loginSaga() {
  while(true) {
    const { userName, password } = yield take(actionTypes.LOGIN)
    try {
      console.log("login::"+userName);
      let { data } = yield call(fetchPostsApi, { userName, password });
      console.log(data);
      // yield fork(loadUserData, data.uid);
      yield put({ type: 'LOGIN_SUCCESS', data });
    } catch(error) {
      yield put({ type: 'LOGIN_ERROR', error });
    }
  }
}
export function* crawlSaga() {
  while(true) {
    yield take(actionTypes.CRAWL)
    yield call(sendToBG,{ msg:'crawlFunc' })
  }
}
function doSave(name,value,type) {
  var blob;
  if (typeof window.Blob == "function") {
    blob = new Blob([value], {type: type});
  } else {
    var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
    var bb = new BlobBuilder();
    bb.append(value);
    blob = bb.getBlob(type);
  }
  var URL = window.URL || window.webkitURL;
  var bloburl = URL.createObjectURL(blob);
  var anchor = document.createElement("a");
  if ('download' in anchor) {
    anchor.style.visibility = "hidden";
    anchor.href = bloburl;
    anchor.download = name;
    document.body.appendChild(anchor);
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    anchor.dispatchEvent(evt);
    document.body.removeChild(anchor);
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name);
  } else {
    location.href = bloburl;
  }
}
function getStorage(contentHeader,fileName,dataType) {
    const header1 = "<?xml version=\"1.0\"?>\n" +
        "<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"\n" +
        " xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n" +
        " xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\n" +
        " xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"\n" +
        " xmlns:html=\"http://www.w3.org/TR/REC-html40\">\n" +
        " <DocumentProperties xmlns=\"urn:schemas-microsoft-com:office:office\">\n" +
        "  <Created>1996-12-17T01:32:42Z</Created>\n" +
        "  <LastSaved>2000-11-18T06:53:49Z</LastSaved>\n" +
        "  <Version>14.0</Version>\n" +
        " </DocumentProperties>\n" +
        " <OfficeDocumentSettings xmlns=\"urn:schemas-microsoft-com:office:office\">\n" +
        "  <RemovePersonalInformation/>\n" +
        " </OfficeDocumentSettings>\n" +
        " <ExcelWorkbook xmlns=\"urn:schemas-microsoft-com:office:excel\">\n" +
        "  <WindowHeight>10020</WindowHeight>\n" +
        "  <WindowWidth>28720</WindowWidth>\n" +
        "  <WindowTopX>0</WindowTopX>\n" +
        "  <WindowTopY>0</WindowTopY>\n" +
        "  <AcceptLabelsInFormulas/>\n" +
        "  <ProtectStructure>False</ProtectStructure>\n" +
        "  <ProtectWindows>False</ProtectWindows>\n" +
        " </ExcelWorkbook>\n" +
        " <Styles>\n" +
        "  <Style ss:ID=\"Default\" ss:Name=\"Normal\">\n" +
        "   <Alignment ss:Vertical=\"Bottom\"/>\n" +
        "   <Borders/>\n" +
        "   <Font ss:FontName=\"宋体\" x:CharSet=\"134\" ss:Size=\"12\"/>\n" +
        "   <Interior/>\n" +
        "   <NumberFormat/>\n" +
        "   <Protection/>\n" +
        "  </Style>\n" +
        "  <Style ss:ID=\"s66\">\n" +
        "   <Font ss:FontName=\"宋体\" x:CharSet=\"134\"/>\n" +
        "  </Style>\n" +
        "  <Style ss:ID=\"s67\">\n" +
        "   <Font/>\n" +
        "  </Style>\n" +
        "  <Style ss:ID=\"s70\">\n" +
        "   <Font/>\n" +
        "   <NumberFormat/>\n" +
        "  </Style>\n" +
        " </Styles>\n" +
        " <Worksheet ss:Name=\"Sheet1\">\n" +
        "  <Table ss:ExpandedColumnCount=\"100\" ss:ExpandedRowCount=\"";
    const header2 = "\" x:FullColumns=\"1\"\n" +
        "   x:FullRows=\"1\" ss:DefaultColumnWidth=\"54\" ss:DefaultRowHeight=\"14.25\">\n" +
        "   <Column ss:AutoFitWidth=\"0\" ss:Width=\"74\"/>\n" +
        "   <Column ss:Width=\"69\"/>\n";

    const rowHeader = "<Row ss:AutoFitHeight=\"0\" ss:Height=\"14\">\n";
    const rowFooter = "</Row>\n";
    const cellHeader = "<Cell ss:StyleID=\"s67\"><Data ss:Type=\"String\">\n";
    const cellFooter = "</Data></Cell>\n";

    const footer = "  </Table>\n" +
        "  <WorksheetOptions xmlns=\"urn:schemas-microsoft-com:office:excel\">\n" +
        "   <Unsynced/>\n" +
        "   <PageLayoutZoom>0</PageLayoutZoom>\n" +
        "   <Selected/>\n" +
        "   <Panes>\n" +
        "    <Pane>\n" +
        "     <Number>3</Number>\n" +
        "     <ActiveRow>4</ActiveRow>\n" +
        "     <ActiveCol>3</ActiveCol>\n" +
        "    </Pane>\n" +
        "   </Panes>\n" +
        "   <ProtectObjects>False</ProtectObjects>\n" +
        "   <ProtectScenarios>False</ProtectScenarios>\n" +
        "  </WorksheetOptions>\n" +
        " </Worksheet>\n" +
        " <Worksheet ss:Name=\"Sheet2\">\n" +
        "  <Table ss:ExpandedColumnCount=\"1\" ss:ExpandedRowCount=\"1\" x:FullColumns=\"1\"\n" +
        "   x:FullRows=\"1\" ss:DefaultColumnWidth=\"54\" ss:DefaultRowHeight=\"14.25\">\n" +
        "   <Row ss:AutoFitHeight=\"0\" ss:Height=\"14\"/>\n" +
        "  </Table>\n" +
        "  <WorksheetOptions xmlns=\"urn:schemas-microsoft-com:office:excel\">\n" +
        "   <Unsynced/>\n" +
        "   <PageLayoutZoom>0</PageLayoutZoom>\n" +
        "   <ProtectObjects>False</ProtectObjects>\n" +
        "   <ProtectScenarios>False</ProtectScenarios>\n" +
        "  </WorksheetOptions>\n" +
        " </Worksheet>\n" +
        " <Worksheet ss:Name=\"Sheet3\">\n" +
        "  <Table ss:ExpandedColumnCount=\"1\" ss:ExpandedRowCount=\"1\" x:FullColumns=\"1\"\n" +
        "   x:FullRows=\"1\" ss:DefaultColumnWidth=\"54\" ss:DefaultRowHeight=\"14.25\">\n" +
        "   <Row ss:AutoFitHeight=\"0\" ss:Height=\"14\"/>\n" +
        "  </Table>\n" +
        "  <WorksheetOptions xmlns=\"urn:schemas-microsoft-com:office:excel\">\n" +
        "   <Unsynced/>\n" +
        "   <PageLayoutZoom>0</PageLayoutZoom>\n" +
        "   <ProtectObjects>False</ProtectObjects>\n" +
        "   <ProtectScenarios>False</ProtectScenarios>\n" +
        "  </WorksheetOptions>\n" +
        " </Worksheet>\n" +
        "</Workbook>";
    var content = header1+"1111111111"+header2;//+rowHeader+cellHeader+'content'+cellFooter+rowFooter+footer;
    content += rowHeader;
    for(var h in contentHeader){
        content += cellHeader+contentHeader[h]+cellFooter;
    }
    content += rowFooter;


    var type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    return chrome.storage.local.get([dataType], function(obj){
        // console.log(obj);
        console.log(obj[dataType]);
        for(var v of obj[dataType]){
            content += rowHeader;
            for(var k in contentHeader){
                content += cellHeader + v[contentHeader[k]]+ cellFooter;
            }
            // content += cellHeader + v['name']+ cellFooter;
            // content += cellHeader + v.company + cellFooter;
            // content += cellHeader + v.email + cellFooter;
            // content += cellHeader + v.country + cellFooter;
            // content += cellHeader + v.grade+ cellFooter;
            content += rowFooter;
        }
        content += footer;

        doSave(fileName,content,type)
        if(dataType=='cards'){
            chrome.storage.local.set({
                cards: []
            }, function(){
                console.log('保存成功');
            })
        }else if(dataType=='keywords'){
            chrome.storage.local.set({
                keywords: []
            }, function(){
                console.log('保存成功');
            })

        }


    });
}

export function* exportSaga() {
  while(true) {
    yield take(actionTypes.EXPORT);
    var fileName = 'Cards.xls';

    const contentHeader = ['name','company','email','country','grade']


    yield call(getStorage,contentHeader,fileName,'cards')

  }
}
export function* crawlKWSaga() {
    while(true) {
        const { keywords } = yield take(actionTypes.CRAWLKW)
        console.log(keywords);
        yield call(sendToBG,{ msg:'crawlKeywordFunc',keywords:keywords })
    }
}
export function* exportKWSaga() {
    while(true) {
        yield take(actionTypes.EXPORTKW)

        var fileName = 'Keyword.xls';

        const contentHeader = ['keyword','searchCount','trend','goodsCount','clickRate']


        yield call(getStorage,contentHeader,fileName,'keywords')


    }
}


export default function* rootSaga() {
  yield [
    // fetchPosts(),
    loginSaga(),
    crawlSaga(),
    exportSaga(),
    crawlKWSaga(),
    exportKWSaga(),
    // loadUserData()
  ]
}
