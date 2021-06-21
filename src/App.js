import React, { useState, useEffect } from "react";
import { AlignmentEditor, AlignmentProvider } from "alignment-editor-rcl";
import "./App.css";

const LINKS_STUB = '[ { "sources": [], "targets": [] } ]';

const editor = (
  showEditor,
  source,
  reference,
  target,
  userLinks,
  referenceLinks,
  stateHook
) => {
  if (showEditor) {
    return (
      <AlignmentProvider>
        <AlignmentEditor
          sourceSegments={source}
          referenceSegments={reference}
          targetSegments={target}
          userLinks={userLinks}
          referenceLinks={referenceLinks}
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

  const [source, setSource] = useState("A sourcey source of course");
  const [reference, setReference] = useState("reefy ref refity reef ref");
  const [target, setTarget] = useState("target targ targ targety");
  const [userLinks, setUserLinks] = useState("[ {\"sources\": [], \"targets\": [] } ]");
  const [referenceLinks, setReferenceLinks] = useState("[ {\"sources\": [0, 1], \"targets\": [1, 2] } ]");

  const [rclSource, setRclSource] = useState([]);
  const [rclReference, setRclReference] = useState([]);
  const [rclTarget, setRclTarget] = useState([]);
  const [rclUserLinks, setRclUserLinks] = useState([]);
  const [rclReferenceLinks, setRclReferenceLinks] = useState(null);

  const [emittedState, setEmittedState] = useState([]);

  useEffect(() => {});

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
                  source
                    .split(" ")
                    .map((word) => {
                      if (word) {
                        return { text: word };
                      }
                    })
                    .filter((thing) => thing)
                );

                setRclReference(
                  reference
                    .split(" ")
                    .map((word) => {
                      if (word) {
                        return { text: word };
                      }
                    })
                    .filter((thing) => thing)
                );

                setRclTarget(
                  target
                    .split(" ")
                    .map((word) => {
                      if (word) {
                        return { text: word };
                      }
                    })
                    .filter((thing) => thing)
                );

                setRclUserLinks(
                  JSON.parse(userLinks).map((partialLink) => {
                    return {
                      sources: partialLink.sources,
                      targets: partialLink.targets,
                      type: "manual",
                    };
                  })
                );

                if (referenceLinks) {
                  setRclReferenceLinks(
                    JSON.parse(referenceLinks).map((partialLink) => {
                      return {
                        sources: partialLink.sources,
                        targets: partialLink.targets,
                        type: "manual",
                      };
                    })
                  );
                }

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
              setReference("");
              setTarget("");
              setUserLinks("");
              setReferenceLinks("");
              setRclSource([]);
              setRclReference([]);
              setRclTarget([]);
              setRclUserLinks([]);
              setRclReferenceLinks([]);
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
          Reference Text:
          <input
            disabled={showEditor}
            size="100"
            type="text"
            value={reference}
            placeholder="enter as string"
            onChange={(e) => {
              setReference(e.target.value);
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
          User Links:
          <input
            disabled={showEditor}
            size="100"
            type="text"
            value={userLinks}
            placeholder="enter as array of objects like: [{ sources: [0, 1] targets: [1] }, { sources: [2], targets: [3, 4, 5] }]"
            onChange={(e) => {
              setUserLinks(e.target.value);
            }}
          />
        </label>

        <label>
          Reference Links:
          <input
            disabled={showEditor}
            size="100"
            type="text"
            value={referenceLinks}
            placeholder="enter as array of objects like: [{ sources: [0, 1] targets: [1] }, { sources: [2], targets: [3, 4, 5] }]"
            onChange={(e) => {
              setReferenceLinks(e.target.value);
            }}
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid",
          marginTop: "1rem",
          marginBottom: "1rem",
          marginLeft: "10rem",
          marginRight: "10rem",
          padding: "0.5rem",
        }}
      >
        {editor(
          showEditor,
          rclSource,
          rclReference,
          rclTarget,
          rclUserLinks,
          rclReferenceLinks,
          (state) => {
            setEmittedState(state);
          }
        )}
      </div>

      <div>
        <p>State emitted from component:</p>
        <p>{JSON.stringify(emittedState, null, " ")}</p>
      </div>
    </div>
  );
};

export default App;
