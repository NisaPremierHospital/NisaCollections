// import CodeMirror from 'codemirror';
// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/lint/lint';
// import 'codemirror-graphql/hint';
// import 'codemirror-graphql/lint';
// import 'codemirror-graphql/mode';

CodeMirror = require('codemirror');
    require('codemirror/addon/hint/show-hint');
    require('codemirror/addon/comment/comment');
    require('codemirror/addon/edit/matchbrackets');
    require('codemirror/addon/edit/closebrackets');
    require('codemirror/addon/fold/foldgutter');
    require('codemirror/addon/fold/brace-fold');
    require('codemirror/addon/search/search');
    require('codemirror/addon/search/searchcursor');
    require('codemirror/addon/search/jump-to-line');
    require('codemirror/addon/dialog/dialog');
    require('codemirror/addon/lint/lint');
    require('codemirror/keymap/sublime');
    require('codemirror-graphql/hint');
    require('codemirror-graphql/lint');
    require('codemirror-graphql/info');
    require('codemirror-graphql/jump');
    require('codemirror-graphql/mode');


    import { GraphQLNonNull, GraphQLList } from 'graphql';
import MD from 'markdown-it';

var md = new MD();

    function onHasCompletion(cm, data, onHintInformationRender) {
      const CodeMirror = require('codemirror');
    
      let information;
      let deprecation;
    
      // When a hint result is selected, we augment the UI with information.
      CodeMirror.on(data, 'select', (ctx, el) => {
        // Only the first time (usually when the hint UI is first displayed)
        // do we create the information nodes.
        if (!information) {
          const hintsUl = el.parentNode;
    
          // This "information" node will contain the additional info about the
          // highlighted typeahead option.
          information = document.createElement('div');
          information.className = 'CodeMirror-hint-information';
          hintsUl.appendChild(information);
    
          // This "deprecation" node will contain info about deprecated usage.
          deprecation = document.createElement('div');
          deprecation.className = 'CodeMirror-hint-deprecation';
          hintsUl.appendChild(deprecation);
    
          // When CodeMirror attempts to remove the hint UI, we detect that it was
          // removed and in turn remove the information nodes.
          let onRemoveFn;
          hintsUl.addEventListener(
            'DOMNodeRemoved',
            (onRemoveFn = event => {
              if (event.target === hintsUl) {
                hintsUl.removeEventListener('DOMNodeRemoved', onRemoveFn);
                information = null;
                deprecation = null;
                onRemoveFn = null;
              }
            }),
          );
        }
    
        // Now that the UI has been set up, add info to information.
        const description = ctx.description
          ? md.render(ctx.description)
          : 'Self descriptive.';
        const type = ctx.type
          ? '<span class="infoType">' + renderType(ctx.type) + '</span>'
          : '';
    
        information.innerHTML =
          '<div class="content">' +
          (description.slice(0, 3) === '<p>'
            ? '<p>' + type + description.slice(3)
            : type + description) +
          '</div>';
    
        if (ctx.isDeprecated) {
          const reason = ctx.deprecationReason
            ? md.render(ctx.deprecationReason)
            : '';
          deprecation.innerHTML =
            '<span class="deprecation-label">Deprecated</span>' + reason;
          deprecation.style.display = 'block';
        } else {
          deprecation.style.display = 'none';
        }
    
        // Additional rendering?
        if (onHintInformationRender) {
          onHintInformationRender(information);
        }
      });
    }
    
    function renderType(type) {
      if (type instanceof GraphQLNonNull) {
        return `${renderType(type.ofType)}!`;
      }
      if (type instanceof GraphQLList) {
        return `[${renderType(type.ofType)}]`;
      }
      return `<a class="typeName">${type.name}</a>`;
    }

import schema from "./graphQL/schema";
import { makeExecutableSchema } from "graphql-tools";

var executableSchema = makeExecutableSchema({ typeDefs: schema});
var cachedValue = '';

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  // mode: 'graphql',
  // readOnly: false,
  // lint: {
  //   schema: executableSchema
  // },
  // hintOptions: {
  //   schema: executableSchema
  // }
      value: `
      {
          allNisaCollections(report_type: "lab", LIMIT: 500, SKIP: 0) {
            NisaCollections {
              _id
              emr_id
              patient_first_name
              patient_last_name
              provider_or_scheme
              report_type
              labtests_config_name
              lab_result_id
              lab_result_data_value
              lab_template_data_label
            }
          }
        }
      `,
      lineNumbers: true,
      tabSize: 2,
      mode: 'graphql',
      theme: 'graphiql',
      keyMap: 'sublime',
      autoCloseBrackets: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      readOnly: false,
      foldGutter: {
        minFoldSize: 4,
      },
      lint: {
        schema: executableSchema,
      },
      hintOptions: {
        schema: executableSchema,
        closeOnUnfocus: false,
        completeSingle: false,
      },
      // info: {
      //   schema: executableSchema,
      //   renderDescription: text => md.render(text),
      //   onClick: reference => this.props.onClickReference(reference),
      // },
      // jump: {
      //   schema: executableSchema,
      //   onClick: reference => this.props.onClickReference(reference),
      // },
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
});

var AUTO_COMPLETE_AFTER_KEY = /^[a-zA-Z0-9_@(]$/;

var _onKeyUp = (cm, event) => {
  if (AUTO_COMPLETE_AFTER_KEY.test(event.key)) {
    editor.execCommand('autocomplete');
  }
};

var _onHasCompletion = (cm, data) => {
  onHasCompletion(cm, data, handleHintInformationRender);
};

var handleHintInformationRender = elem => {
  elem.addEventListener('click', _onClickHintInformation);

  let onRemoveFn;
  elem.addEventListener(
    'DOMNodeRemoved',
    (onRemoveFn = () => {
      elem.removeEventListener('DOMNodeRemoved', onRemoveFn);
      elem.removeEventListener('click', _onClickHintInformation);
    }),
  );
};

var _onClickHintInformation = event => {
  if (event.target.className === 'typeName') {
    const typeName = event.target.innerHTML;
    const schema = executableSchema;
    if (schema) {
      const type = schema.getType(typeName);
      if (type) {
        console.log("Ignore toggle docs");
        // this.setState({ docExplorerOpen: true }, () => {
        //   this.docExplorerComponent.showDoc(type);
        // });
      }
    }
  }
};


var _onEdit = () => {
  
};




editor.on('change', _onEdit);
editor.on('keyup', _onKeyUp);
editor.on('hasCompletion', _onHasCompletion);
// editor.on('beforeChange', this._onBeforeChange);