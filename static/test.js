!(function (e) {
  e.on("AddEditor", function (e) {
    e.editor.settings.inline_styles = !1;
  }),
    e.PluginManager.add("legacyoutput", function (t, n, i) {
      t.on("init", function () {
        var n = "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
          i = e.explode(t.settings.font_size_style_values),
          a = t.schema;
        t.formatter.register({
          alignleft: { selector: n, attributes: { align: "left" } },
          aligncenter: { selector: n, attributes: { align: "center" } },
          alignright: { selector: n, attributes: { align: "right" } },
          alignjustify: { selector: n, attributes: { align: "justify" } },
          bold: [
            { inline: "b", remove: "all" },
            { inline: "strong", remove: "all" },
            { inline: "span", styles: { fontWeight: "bold" } },
          ],
          italic: [
            { inline: "i", remove: "all" },
            { inline: "em", remove: "all" },
            { inline: "span", styles: { fontStyle: "italic" } },
          ],
          underline: [
            { inline: "u", remove: "all" },
            {
              inline: "span",
              styles: { textDecoration: "underline" },
              exact: !0,
            },
          ],
          strikethrough: [
            { inline: "strike", remove: "all" },
            {
              inline: "span",
              styles: { textDecoration: "line-through" },
              exact: !0,
            },
          ],
          fontname: { inline: "font", attributes: { face: "%value" } },
          fontsize: {
            inline: "font",
            attributes: {
              size: function (t) {
                return e.inArray(i, t.value) + 1;
              },
            },
          },
          forecolor: { inline: "font", attributes: { color: "%value" } },
          hilitecolor: {
            inline: "font",
            styles: { backgroundColor: "%value" },
          },
        }),
          e.each("b,i,u,strike".split(","), function (e) {
            a.addValidElements(e + "[*]");
          }),
          a.getElementRule("font") ||
            a.addValidElements("font[face|size|color|style]"),
          e.each(n.split(","), function (e) {
            var t = a.getElementRule(e);
            t &&
              (t.attributes.align ||
                ((t.attributes.align = {}), t.attributesOrder.push("align")));
          });
      }),
        t.addButton("fontsizeselect", function () {
          var e = [],
            n = "8pt=1 10pt=2 12pt=3 14pt=4 18pt=5 24pt=6 36pt=7",
            i = t.settings.fontsize_formats || n;
          return (
            t.$.each(i.split(" "), function (t, n) {
              var i = n,
                a = n,
                o = n.split("=");
              o.length > 1 && ((i = o[0]), (a = o[1])),
                e.push({ text: i, value: a });
            }),
            {
              type: "listbox",
              text: "Font Sizes",
              tooltip: "Font Sizes",
              values: e,
              fixedWidth: !0,
              onPostRender: function () {
                var e = this;
                t.on("NodeChange", function () {
                  var n;
                  (n = t.dom.getParent(t.selection.getNode(), "font")),
                    e.value(n ? n.size : "");
                });
              },
              onclick: function (e) {
                e.control.settings.value &&
                  t.execCommand("FontSize", !1, e.control.settings.value);
              },
            }
          );
        }),
        t.addButton("fontselect", function () {
          function e(e) {
            e = e.replace(/;$/, "").split(";");
            for (var t = e.length; t--; ) e[t] = e[t].split("=");
            return e;
          }
          var n =
              "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
            a = [],
            o = e(t.settings.font_formats || n);
          return (
            i.each(o, function (e, t) {
              a.push({
                text: { raw: t[0] },
                value: t[1],
                textStyle:
                  -1 == t[1].indexOf("dings") ? "font-family:" + t[1] : "",
              });
            }),
            {
              type: "listbox",
              text: "Font Family",
              tooltip: "Font Family",
              values: a,
              fixedWidth: !0,
              onPostRender: function () {
                var e = this;
                t.on("NodeChange", function () {
                  var n;
                  (n = t.dom.getParent(t.selection.getNode(), "font")),
                    e.value(n ? n.face : "");
                });
              },
              onselect: function (e) {
                e.control.settings.value &&
                  t.execCommand("FontName", !1, e.control.settings.value);
              },
            }
          );
        });
    });
})(tinymce);
