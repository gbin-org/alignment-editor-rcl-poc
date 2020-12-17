import React, { useState } from "react";
import { AlignmentEditor, AlignmentProvider } from "alignment-editor-rcl";
import "./App.css";

const LINKS_STUB = '[ { "sources": [], "targets": [] } ]';

const editor = (showEditor, source, target, links, stateHook) => {
  if (showEditor) {
    return (
      <AlignmentProvider>
        <AlignmentEditor
          sourceSegments={source}
          targetSegments={target}
          links={links}
          stateUpdatedHook={stateHook}
        />
      </AlignmentProvider>
    );
  }

  if (!showEditor) {
    return <p>Please enter data and click the "load" button.</p>;
  }
};
export const App = () => {
  const [showEditor, setShowEditor] = useState(false);

  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [links, setLinks] = useState(LINKS_STUB);

  const [rclSource, setRclSource] = useState([]);
  const [rclTarget, setRclTarget] = useState([]);
  const [rclLinks, setRclLinks] = useState([]);

  const [emittedState, setEmittedState] = useState([]);

  return (
    <div>
      <div
        className="header-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>YouAlign™</h1>
      </div>
      <div
        className="controls-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span></span>
        <span>
          <button
            onClick={() => {
              try {
                setRclSource(
                  source.split(" ").map((word, index) => {
                    return { text: word, position: index, type: "source" };
                  })
                );
                setRclTarget(
                  target.split(" ").map((word, index) => {
                    return { text: word, position: index, type: "target" };
                  })
                );
                setRclLinks(
                  JSON.parse(links).map((partialLink) => {
                    return {
                      sources: partialLink.sources,
                      targets: partialLink.targets,
                      type: "manual",
                    };
                  })
                );
                setShowEditor(true);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Load
          </button>

          <button
            onClick={() => {
              setSource("");
              setTarget("");
              setLinks(LINKS_STUB);
              setRclSource([]);
              setRclTarget([]);
              setRclLinks([]);
              setShowEditor(false);
            }}
          >
            Reset
          </button>
        </span>
      </div>
      <div
        className="inputs-container"
        style={{
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label>
          Source Text:
          <input
            disabled={showEditor}
            size="100"
            type="text"
            value={source}
            placeholder="enter as string"
            onChange={(e) => {
              setSource(e.target.value);
            }}
          />
        </label>
        <label>
          Target Text:
          <input
            disabled={showEditor}
            size="100"
            type="text"
            value={target}
            placeholder="enter as string"
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />
        </label>

        <label>
          Links:
          <input
            disabled={showEditor}
            size="100"
            type="text"
            value={links}
            placeholder="enter as array of objects like: [{ sources: [0, 1] targets: [1] }, { sources: [2], targets: [3, 4, 5] }]"
            onChange={(e) => {
              setLinks(e.target.value);
            }}
          />
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "center", border: '2px solid', margin: '1rem', padding: '0.5rem' }}>
        {editor(showEditor, rclSource, rclTarget, rclLinks, (state) => {
          setEmittedState(state);
        })}
      </div>

      <div>
        <p>State emitted from component:</p>
        <p>{JSON.stringify(emittedState, null, " ")}</p>
      </div>
    </div>
  );
};

export default App;
