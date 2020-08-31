tinymce.init({
  selector: "textarea#toolbar-button",
  width: 600,
  height: 300,
  plugins: [
    "image",
  ],
  menubar: "favs file edit view insert format tools table help",
  toolbar:
    "image test",
  extended_valid_elements: "+iframe[src|width|height|name|align|class]",
  setup: function (editor) {
    
    // *Test area!!!
    // ? New window open, need: div input there. Then leaflep start, save map like image, insert in textarea

    
    var getContent = function (editor) {
        return editor.getContent({ source_view: true });
      };

    var open = function (editor) {
        console.log('Test');
      var editorContent = getContent(editor);
      editor.windowManager.open({
        title: "Test",
        size: "large",
        body: {
          type: "panel",// in tinyMce 5 only panel or tabpanel
          items: [
            {
              type: "iframe",
              name: "test",
              value: "Test"
            },
          ],
        },
        buttons: [
          {
            type: "cancel",
            name: "cancel",
            text: "Cancel",
          },
          {
            type: "submit",
            name: "save",
            text: "Save",
            primary: true,
          },
        ],
        initialData: { map: editorContent },
        // onSubmit: function (api) {
        //   setContent(editor, api.getData().code);
        //   api.close();
        // },
      });
    };



    editor.ui.registry.addButton("test", {
      icon: "sourcecode",
      tooltip: "Source test",
      onAction: function () {

        return open(editor);
      },
    });
    
  },
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
});

// var map = L.map("map").setView([45.52875, -122.6632], 5);
// L.tileLayer("http://{s}.tile.cloudmade.com/API-key/997/256/{z}/{x}/{y}.png", {
//   maxZoom: 18,
//   attribution:
//     'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
// }).addTo(map);
