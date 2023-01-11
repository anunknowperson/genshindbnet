import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@mantine/core";


function Editor({ onChange, name, value }) {
    const editorRef = useRef();
    const { CKEditor, BalloonEditor } = editorRef.current || {};
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            BalloonEditor: require("ckeditor5-custom-build/build/ckeditor"),

        };
        setEditorLoaded(true);
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor

                    type=""
                    name={name}
                    editor={BalloonEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();

                        onChange(data);
                    }}

                    config={{
                        // Pass the config for SimpleUploadAdapter
                        // https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/simple-upload-adapter.html
                        simpleUpload: {
                            // The URL that the images are uploaded to.
                            uploadUrl: '/api/images/upload',

                            /*// Enable the XMLHttpRequest.withCredentials property.
                            withCredentials: true,

                            // Headers sent along with the XMLHttpRequest to the upload server.
                            headers: {
                                "X-CSRF-TOKEN": "CSRF-Token",
                                Authorization: "Bearer <JSON Web Token>",
                            },*/
                        }
                    }}
                />
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default Editor;