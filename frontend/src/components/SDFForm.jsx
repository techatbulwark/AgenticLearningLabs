import { useState } from "react";
import axios from "axios";

const SDFForm = () => {
    const FORM_CONFIG = {
        participantDetails: {
            title: "Participant Details",
            fields: [
                {
                    id: "lastName",
                    label: "Last name",
                    type: "text",
                    required: true,
                    gridClass: "lg:col-span-2"
                },
                {
                    id: "firstName",
                    label: "First name",
                    type: "text",
                    required: true,
                    gridClass: "lg:col-span-2"
                },
                {
                    id: "middleInitial",
                    label: "Middle initial",
                    type: "text",
                    required: false,
                    gridClass: "lg:col-span-1"
                },
                {
                    id: "prefName",
                    label: "Preferred bame",
                    type: "text",
                    required: false,
                    gridClass: "lg:col-span-3"
                },
                {
                    id: "dob",
                    label: "Date of birth",
                    type: "date",
                    required: true,
                    gridClass: "lg:col-span-2"
                },
                {
                    id: "gender",
                    label: "I identify as:",
                    type: "radio",
                    required: true,
                    gridClass: "lg:col-full",
                    options: [
                        { value: "man", label: "Man" },
                        { value: "woman", label: "Woman" },
                        { value: "gender-non-binary", label: "Gender non-binary" },
                        { value: "two-spirit", label: "Two-spirit" },
                        { value: "other", label: "Another gender identity (specify):", hasInput: true },
                        { value: "prefer-not-to-answer", label: "Prefer not to answer" },
                    ]
                },
                {
                    id: "transgender",
                    label: "Do you identify as transgender? (optional)",
                    type: "radio",
                    required: true,
                    gridClass: "lg:col-full",
                    options: [
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                        { value: "questioning", label: "Questionining" },
                        { value: "prefer-not-to-answer", label: "Prefer not to answer" },
                    ]
                },
                {
                    id: "statusCanada",
                    label: "Status in Canada:",
                    type: "radio",
                    required: true,
                    gridClass: "lg:col-full",
                    options: [
                        { value: "yes", label: "Canadian Citizen" },
                        { value: "no", label: "Permanent Resident" },
                        { value: "questioning", label: "Naturalized Canadian Citizen" },
                        { value: "prefer-not-to-answer", label: "Protected Persons" },
                        { value: "prefer-not-to-answer", label: "Prefer not to answer" },
                        { value: "other", label: "Other", hasInput: true },
                    ]
                },
                {
                    id: "countryOrigin",
                    label: "Country of Origin",
                    type: "text",
                    required: false,
                    gridClass: "lg:col-span-3"
                },
                {
                    id: "dateEntryCanada",
                    label: "Date of Entry into Canada",
                    type: "text",
                    required: false,
                    gridClass: "lg:col-span-2"
                },
                {
                    id: "prefLanguage",
                    label: "Preferred Language",
                    type: "radio",
                    required: true,
                    gridClass: "lg:col-full",
                    options: [
                        { value: "english", label: "English" },
                        { value: "french", label: "French" },
                    ]
                },
                {
                    id: "prefCommunication",
                    label: "Preferred Communication",
                    type: "radio",
                    required: false,
                    gridClass: "lg:col-full",
                    options: [
                        { value: "english", label: "English" },
                        { value: "french", label: "French" },
                        { value: "french", label: "French" },
                    ]
                },
                {
                    id: "maritalStatus",
                    label: "MartialStatus",
                    type: "radio",
                    required: false,
                    gridClass: "lg:col-full",
                    options: [
                        { value: "english", label: "English" },
                        { value: "french", label: "French" },
                        { value: "french", label: "French" },
                        { value: "french", label: "French" },
                        { value: "french", label: "French" },
                    ]
                },
            ]

        }
    };
    
    const renderField = (field) => {
        const commonClasses = "";
        switch (field.type) {
        }
    }

}