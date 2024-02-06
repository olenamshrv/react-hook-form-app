import React from "react";

import "./index.css"

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

enum FIELD_KEY {
    MESSAGE="message",
    NAME="name",
}

interface FormType {
    [FIELD_KEY.MESSAGE]: string;
    [FIELD_KEY.NAME]: string;
}

export default function Container() {
    const { register, formState, handleSubmit, reset } = useForm<FormType>({mode: "onChange"});

    // const onSubmit: SubmitHandler<FormType> = (data) => console.log("data", data)

    const onSubmit: SubmitHandler<FormType> = (data) => {
        return new Promise((resolve, rejects) => {
            setTimeout(()=> resolve("test"), 5000);
        })
    }

    const onError: SubmitErrorHandler<FormType> = (errors) => console.log("errors", errors[FIELD_KEY.MESSAGE]); 

    const validateRequired = (value: any) => value.length === 0 ? "Поле не може бути пустим" : true

    return (
        <div className="contact">
            <div className="contact__title">Contact Form
            </div>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="contact__form">
                <input 
                    className="contact__input"
                    placeholder="Your message"
                    {...register(FIELD_KEY.MESSAGE, { 
                        validate: {
                            validateRequired,
                            // required: (value) => value.length === 0 ? "Поле не може бути пустим" : true,
                        // { required: true}
                            isNumber: (value) => isNaN(Number(value)) ? "Значення має бути числовим" : true
                    }
                    })}
                />

                {formState.errors[FIELD_KEY.MESSAGE] && (
                    <span>{formState.errors[FIELD_KEY.MESSAGE].message}</span>
                )}

                <input 
                    className="contact__input"
                    placeholder="Your name"
                    {...register(FIELD_KEY.NAME, { 
                        validate: {
                            validateRequired,
                            // required: (value) => value.length === 0 ? "Поле не може бути пустим" : true,
                        // { required: true}
                            isNumber: (value) => isNaN(Number(value)) ? "Значення має бути числовим" : true
                    }
                    })}
                />

                {formState.errors[FIELD_KEY.NAME] && (
                    <span>{formState.errors[FIELD_KEY.NAME].message}</span>
                )}

                <button disabled={formState.isValid !== true || formState.isSubmitting === true}
                className="contact__button" type="submit">
                    Submit
                </button>

                {formState.isSubmitting && <span>Loading...</span>}
                <span>Submit count: {formState.submitCount}</span>

            </form>
        </div>
    )
}