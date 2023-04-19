import { FloatingLabel, Form } from "react-bootstrap";
import { useFormik } from "formik";
import clsx from "clsx";
import registrationSchemaCommit from "../controllers/validateCommittee";
import axios from "axios";
import { Committee, initialValues } from "../types/committee";
import { URI, URIcommit } from "../enumerations/uri";
import { useEffect, useRef, useState } from "react";
import { Calls } from "../types/call";
import { avisoConcluido } from "../controllers/avisoConcluido";
import { avisoErro } from "../controllers/avisoErro";
import { ComiteCto } from "./ComiteCto";
import { ComiteCso } from "./ComiteCso";
import { ComiteRt } from "./ComiteRt";
import { ComiteSquad } from "./ComiteSquad";
import autoAnimate from "@formkit/auto-animate";

export function DropComite() {

    // const [data, setData] = useState<Calls[]>([]);

    // useEffect(() => {
    //     async function fetchCalls() {
    //         axios
    //             .get(URI.PEGAR_CALL)
    //             .then((response) => {
    //                 setData(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    //     fetchCalls();
    // }, []);

    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchemaCommit,
        onSubmit: async (values) => {
            JSON.stringify(values, null, 2);
            await axios.post(URIcommit.ENVIAR_COMITE, formik.values);
        },
    });

    function onClickEnviar() {
        if (!formik.isValid) {
            avisoErro();
        } else {
            formik.submitForm();
            avisoConcluido();
        }
    }

    const [show, setShow] = useState<number | null>(null);
    const parent = useRef(null);
    useEffect(() => {
      parent.current && autoAnimate(parent.current);
    }, [parent]);
    const reveal = (id: number) => {
      setShow(show === id ? null : id);
    };

    return (
        <div>

            {/* {data.map((data) => {
                return (
                    <>
                    <div key={data.id} ref={parent}>
                        {show === data.id && (
                            <FloatingLabel controlId="floatingLabel" label="Descrição">
                                <Form.Control
                                    type="text"
                                    defaultValue={data.callDescription}
                                    disabled />
                            </FloatingLabel>
                        )}
                    </div>
                    <br />
                    
                    </>
                );
            })} */}

            {/* {data.map((data) => {
                return (
                    <FloatingLabel controlId="floatingLabel" label="Descrição">
                        <Form.Control
                            type="text"
                            defaultValue={data.callDescription}
                            disabled
                        />
                    </FloatingLabel>
                )
            })} */}
            <br />
            <form
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                noValidate
                id="form-solicitacao"
                onSubmit={formik.handleSubmit}
                style={{ margin: "8px" }}
            >
                <div className="row">
                    <h6>Comitê de aprovação</h6>

                    <div className="col-lg-4"> {ComiteCso()} </div>
                    <div className="col-lg-4"> {ComiteRt()} </div>
                    <div className="col-lg-4"> {ComiteCto()} </div>

                </div>

                <div className="row">
                    <div className="col-lg-4"> {ComiteRt()} </div>
                    <div className="col-lg-4"> {ComiteSquad()} </div>

                    <div className="fv-row mb d-flex align-items-center">
                        <button
                            type="button"
                            className="btn btn-form"
                            onClick={onClickEnviar}
                            disabled={formik.isSubmitting}
                        >
                            Submeter
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-send-check-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
