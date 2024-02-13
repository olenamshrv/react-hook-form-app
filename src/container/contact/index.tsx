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
    const { register, formState, handleSubmit, reset, resetField, setValue, setFocus, setError, clearErrors, getFieldState, getValues, trigger } = useForm<FormType>({
        // mode: "onChange",    
        mode: "onTouched",
        defaultValues: async () => {
            return new Promise((resolve, rejects) => {
                setTimeout(
                    () => resolve({
                        [FIELD_KEY.MESSAGE]: "Message",
                        [FIELD_KEY.NAME]: "Name",
                    }),
                    5000,
                );
            });
        },
    });

    // const onSubmit: SubmitHandler<FormType> = (data) => console.log("data", data)

    const onSubmit: SubmitHandler<FormType> = (data) => {
        return new Promise((resolve, rejects) => {
            setTimeout(()=> resolve("test"), 5000);
        })
    }

    const onError: SubmitErrorHandler<FormType> = (errors) => console.log("errors", errors[FIELD_KEY.MESSAGE]); 

    const validateRequired = (value: any) => value.length === 0 ? "Поле не може бути пустим" : true

    console.log(getFieldState(FIELD_KEY.MESSAGE, formState));

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

                <button 
                    className="contact__button"
                    onClick={() => 
                        reset({
                            [FIELD_KEY.MESSAGE]: "Reset",
                            [FIELD_KEY.NAME]: "Reset",
                        },
                        { keepDirtyValues: true }
                        )
                    }
                    >
                     Reset     
                </button>

                <button 
                    className="contact__button"
                    onClick={() => 
                        resetField(FIELD_KEY.MESSAGE, { defaultValue: "New value"})
                    }
                    >
                     Reset Field    
                </button>

                <button 
                    type="button"
                    className="contact__button"
                    onClick={() => 
                        setValue(FIELD_KEY.MESSAGE, "New Value", { shouldValidate: true })
                    }
                    >
                     Reset Field    
                </button>

                <button 
                    type="button"
                    className="contact__button"
                    onClick={() => 
                        setFocus(FIELD_KEY.MESSAGE, { shouldSelect: true})
                    }
                    >
                     Set Focus    
                </button>

                <button 
                    type="button"
                    className="contact__button"
                    onClick={() => 
                        setError(FIELD_KEY.MESSAGE, { type: "CustomError", message: "Test Error"}, { shouldFocus: true })
                    }
                    >
                     Set Error    
                </button>

                <button 
                    type="button"
                    className="contact__button"
                    onClick={() => 
                        clearErrors(FIELD_KEY.MESSAGE)
                    }
                    >
                     Clear Errors
                </button>

                <button 
                    type="button"
                    className="contact__button"
                    onClick={() => {
                        // console.log(getValues(FIELD_KEY.MESSAGE)
                        // console.log(getValues([FIELD_KEY.MESSAGE, FIELD_KEY.NAME]))
                        console.log(getValues())
                    }
                    }
                    >
                     Get Values
                </button>

                <button 
                    type="button"
                    className="contact__button"
                    onClick={async () => {
                        // const result = await trigger(FIELD_KEY.MESSAGE)

                        const result = await trigger([FIELD_KEY.MESSAGE, FIELD_KEY.NAME])
                        console.log(result)
                        }
                    }>
                    Trigger
                </button>

                {formState.isSubmitting && <span>Loading...</span>}
                <span>Submit count: {formState.submitCount}</span>

            </form>
        </div>
    )
}