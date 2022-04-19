/*
 * Markdown to PDF parser that formats and saves a markdown file into pdf form. src: https://codesandbox.io/s/zp4qj?file=/src/markdown.js
 *
 * Format:
 *   Standards based on: https://www.markdownguide.org/basic-syntax/
 * Currently not supported:
 *   - HTML syntax
 * 
 */
import axios from 'axios';
import jspdf from 'jspdf';


const MarkdownToPDF = () => {
    const doc = new jspdf();
    let first = 40;
    let writingCodeSegment = false;
    let writingBlockQuote = false;

    // general fonts
    const SPACE_LEFT = 20;
    const SPACE_RIGHT = 20;
    const INDENT = 5;
    const { fontName: FONT } = doc.getFont();
    const codeFont = "Courier";
    const fontSize = 12;
    const spacingSize = 6;
    const fontType = 'normal';
    const textMaxWidth = 130;

    //header sizes
    const HEADER_BASE = 22;
    const HEADER_BASE_SPACING = 15;
    const HEADER_DECREMENT_AMOUNT = 2;
    const HEADER_MAX_WIDTH = 80;

    var aGraphics1 = new Array();
    var aGraphics2 = new Array();


    //Character Maps
    let escapeCharHashmap = new Map([
        ["```", {
          closing:"```", 
          name:"triple_backtick", 
          font: codeFont,
          font_type: fontType
        }], 
        ["``", {
          closing:"``", 
          name:"double_backtick",
          font: codeFont,
          font_type: fontType
        }],
        ["`", {
          closing:"`", 
          name:"single_backtick",
          font: codeFont,
          font_type: fontType
        }],
        ["\\", {
          closing:null, 
          name:"backslash",
          font: FONT,
          font_type: fontType,
        }],
        ["*", {
          closing:"*", 
          name:"italic",
          font: FONT,
          font_type: 'italic'
        }],
        [" _", {
          closing:"_ ", 
          name:"italic",
          font: FONT,
          font_type: 'italic'
        }],
        ["**", {
          closing:"**", 
          name:"bold", 
          font: FONT,
          font_type: 'bold'
        }],
        [" __", {
          closing:"__ ", 
          name:"bold",
          font: FONT,
          font_type: 'bold'
        }],
        ["***", {
          closing:"***", 
          name:"bold_italic",
        }],
        [" ___", {
          closing:"___ ", 
          name:"bold_italic",
          font: FONT,
          font_type:"bolditalic"
        }],
        [" __*", {
          closing:"*__ ", 
          name:"bold_italic",
          font: FONT,
          font_type:"bolditalic"}],
        ["**_", {
          closing:"_**", 
          name:"bold_italic",
          font: FONT,
          font_type:"bolditalic"
        }]
    ])

    //Add to the Document
    const insertPage = () => {
      doc.addPage();
      first = 20;
    }

    const addTextToDocument = (text:string, fontSize:number, spacing:number) => {
      //var max_width = getMaxWidth(text, fontSize, );
    }

    const convertHeader = (text:string, fontSize:number, spacing:number) =>{
      doc.setFontSize(fontSize);
      doc.setFont(FONT, 'bold');
      while(text.includes("\n")){
        doc.text(text.substring(0,text.indexOf("\n")), SPACE_LEFT, first);
        first += spacing;
        text = text.substring(text.indexOf("\n")+1);
      }
      doc.text(text, SPACE_LEFT, first);
      //first += spacing;
      doc.setFont(FONT, 'normal');
    }

    const convertBold = (text:string) => {
      doc.setFont(FONT, 'bold')
      while(text.includes("\n")){
        doc.text(text.substring(0,text.indexOf("\n")), SPACE_LEFT, first)
        first += 5
        text = text.substring(text.indexOf("\n")+1);
      }
      doc.text(text, SPACE_LEFT, first)
      first += 5
      doc.setFont(FONT, 'normal')
    }

    const convertItalic = (text:string) => {
      doc.setFont(FONT, 'italic')
      while(text.includes("\n")){
        doc.text(text.substring(0,text.indexOf("\n")), SPACE_LEFT, first)
        first += 5
        text = text.substring(text.indexOf("\n")+1);
      }
      doc.text(text, SPACE_LEFT, first)
      first += 5
      doc.setFont(FONT, 'normal')
    }

    const convertText = (text:string) => {
      doc.setFontSize(12)
      while(text.includes("\n")){
        doc.text(text.substring(0,text.indexOf("\n")), SPACE_LEFT, first)
        first += spacingSize
        text = text.substring(text.indexOf("\n")+1);
      }
      doc.text(text, SPACE_LEFT, first)
    }

    const convertListComponent = (text:string) =>{
      doc.setFontSize(12)
      while(text.includes("\n")){
        doc.text(text.substring(0,text.indexOf("\n")), SPACE_LEFT + INDENT, first)
        first += spacingSize
        text = text.substring(text.indexOf("\n")+1);
      }
      doc.text(text, SPACE_LEFT + INDENT, first)
    }

    const convertCode = (text:string) => {
      if(!writingCodeSegment){
        doc.setFont(FONT)
        convertText(text);
        return
      }
      doc.setFontSize(12)
      doc.setFont(codeFont)
      while(text.includes("\n")){
        doc.text(text.substring(0,text.indexOf("\n")), SPACE_LEFT, first)
        first += spacingSize
        text = text.substring(text.indexOf("\n")+1);
      }
      doc.text(text, SPACE_LEFT, first)
      first += spacingSize
    }
    const convertBlockQuote = (text:string) => {
      doc.setFontSize(12)
      while(text.includes("\n")){
        doc.setFillColor(184, 220, 241)
        doc.rect(SPACE_LEFT + INDENT, first - 4, (doc.internal.pageSize.getWidth() - INDENT - SPACE_LEFT - SPACE_RIGHT), 5, 'F')
        doc.text(text.substring(0,text.indexOf("\n")), SPACE_LEFT + INDENT, first)
        first += spacingSize
        text = text.substring(text.indexOf("\n")+1);
      }
      doc.text(text, SPACE_LEFT + INDENT, first)
    }

    const convertNonImageLink = (text:string) => {

    }

    //Formatting helpers
    const containsExtraneousFormatting = (text:string) => {
      switch(text){
        case "\\":
          return true;
        case "&nbsp;":
          return true;
      }
    }
    const hasEscapeChars = (text:string) =>{
      let hasEChar = false
      escapeCharHashmap.forEach((value, key) => {
        if(text.indexOf(key) > 0 && value.closing != null && text.indexOf(value.closing) > 0)
          hasEChar = true;
      })
      return hasEChar;
    }
    const startsWithListComponent = (text:string) => {
      if(/^\d/.test(text) && /^\d/.test(text.substring(text.indexOf('.') - 2,))){ //starts with a number
        return true;
      } else if (text.startsWith("-") || text.startsWith("+") || text.startsWith("*")){

      }
      return false;
    }
    const wrapToMaxWidth = (rawStr:string, fontSize:number, indent:number) => {
      var maxWidth = (fontSize - indent - SPACE_LEFT - SPACE_RIGHT);
      rawStr.replace("\n", " ");
      rawStr.replace("  ", " ");
      var regex = new RegExp(/(?:\s*\S+\s*)/g); 

      //todo: handle last word being really long
      var newStr = ""
      while(rawStr.length > 0){
        let temp = rawStr.substring(0,maxWidth);
        let count = temp.match(regex)?.length;
        var regex2 = new RegExp("(^(?:\\s*\\S+\\s*){1," + (count? count:1) + "})", "g")

        temp = rawStr.replace(regex2, "$1\n")
        temp = temp.substring(0, temp.indexOf("\n")+1)

        if(temp.length == 0){
          temp = rawStr
        }

        newStr += temp
        rawStr = rawStr.substring(temp.indexOf("\n"),)
      }

      return newStr;
    }
    const isLast = (current:number, last:number) => {
      if(current !== last)
        first+=spacingSize
      return current;
    }

const MDtoPDF = () => ({
  getParts: (content:string) => {
    let aParts: Array<string>;
    console.log(content)
    aParts = content.split('\n')
    return aParts;
  },
  getGraphics: async (aParts:Array<string>) => {
    for (let i = 0; i < aParts.length; i++) {

      if (aParts[i].startsWith("![")){
        aGraphics1.push(i);
        aGraphics2.push('');

        let altText = aParts[i].substring(2, aParts[i].indexOf("]")) //TODO: handles if user puts \]
        let link = aParts[i].substring(aParts[i].indexOf("(")+1, aParts[i].lastIndexOf(")"));
        if(link.indexOf("\"") > 0)
          link = link.substring(0, link.indexOf("\""));
        let encodedLink = encodeURIComponent(link);
  
        var image = await axios.get('http://localhost:8080/v1/imageRequest/' + encodedLink);
        aGraphics2[aGraphics1.length-1] = image.data;
      }
    }
    return aParts;
  },

  buildDoc: (title:string, aParts:Array<string>) => {
    convertHeader(wrapToMaxWidth(title, HEADER_MAX_WIDTH, 0), HEADER_BASE+2, 10);
    var last = 0
    for (let i = 0; i < aParts.length; i++) {
      let part = aParts[i]

      if(first >= 260){
          insertPage();
      }

      if(writingCodeSegment && !part.startsWith("```")){
        last = isLast(1, last);
        convertCode(part);
      } else if (containsExtraneousFormatting(part) && writingBlockQuote){
        last = isLast(5,last)
        writingBlockQuote = false;
      }
      else if (part === '---') {
        last = isLast(2, last);
        insertPage();
      } 
      else if (part.startsWith('#')) {
        last = isLast(0, last);
        var numHash = part.lastIndexOf('#') + 1;
        var cleanedPart = (part.replaceAll('#', '')).substring(1,)
        convertHeader(wrapToMaxWidth(cleanedPart, HEADER_MAX_WIDTH, 0),  HEADER_BASE - HEADER_DECREMENT_AMOUNT * numHash, spacingSize);
      } 
      else if (part.startsWith("-")){
        last = isLast(3, last);
        convertListComponent(wrapToMaxWidth(part, textMaxWidth, INDENT));
      } 
      else if (part.startsWith(">") || writingBlockQuote){
        last = isLast(5, last);
        writingBlockQuote = true;
        convertBlockQuote(wrapToMaxWidth(part.replace(/(>+ )/, ""), textMaxWidth, INDENT))
      }
      else if (part.startsWith("```")){
        last = isLast(1, last);
        writingCodeSegment = !writingCodeSegment;
        convertCode(wrapToMaxWidth(part.replace("```", ""), textMaxWidth, 0));
      } 
      else if (aGraphics1.includes(i)){
        last = isLast(6, last);
        if(first + 100 > 260)
          insertPage()
        doc.addImage(aGraphics2[0], "jpg", SPACE_LEFT, first, 100, 100);
        first += 100;
      } 
      else if (containsExtraneousFormatting(part)){
        first += spacingSize;
      } 
      else {
        last = isLast(7, last);
        convertText(wrapToMaxWidth(part, textMaxWidth, 0));
      }
    }
  },
  saveAsPDF: (filename:string) => {
    doc.save(filename)
  }
})
  return MDtoPDF
}

export default MarkdownToPDF;