import PDFKit
// Uso: swift set-metadata.swift entrada.pdf salida.pdf "Asunto" "palabras clave"
let d = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1]))!
var a = d.documentAttributes ?? [:]
a[PDFDocumentAttribute.authorAttribute] = "David Ibáñez"
a[PDFDocumentAttribute.subjectAttribute] = CommandLine.arguments[3]
a[PDFDocumentAttribute.keywordsAttribute] = CommandLine.arguments[4]
d.documentAttributes = a
d.write(toFile: CommandLine.arguments[2])
