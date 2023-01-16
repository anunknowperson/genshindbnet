import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "ckeditor5-custom-build/build/ckeditor";

function Editor({ onChange, name, value, disabled }) {


    return (
        <div>

            <CKEditor

                type=""
                name={name}
                editor={BalloonEditor}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();

                    onChange(data);
                }}

                disabled={disabled}

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

        </div>
    );
}

export default Editor;