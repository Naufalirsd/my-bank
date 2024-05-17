import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Header = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
    color: #495057;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
`;

export default function Handler() {
    const [inputValueTitle, setInputValueTitle] = useState("");
    const [inputValueContain, setInputValueContain] = useState("");
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/insertData`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: inputValueTitle,
                contain: inputValueContain,
            }),
        })
            .then((response) => {
                if (!response) {
                    throw new Error("Gagal menambah data");
                }
                return response.json();
            })
            .then((json) => {
                console.log(json);
                alert("Data berhasil ditambah");
                router.push("/");
            })
            .catch((err) => {
                console.error("Error saat menambah data", err.message);
                alert("EROR");
            });
    };

    const handleChangeTitle = (event) => {
        setInputValueTitle(event.target.value);
    };

    const handleChangeContain = (event) => {
        setInputValueContain(event.target.value);
    };

    return (
        <Container>
            <Header>Tambah Data</Header>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title:</Label>
                    <Input
                        onChange={handleChangeTitle}
                        value={inputValueTitle}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Contain:</Label>
                    <Input
                        onChange={handleChangeContain}
                        value={inputValueContain}
                    />
                </FormGroup>
                <SubmitButton type="submit">Add Data</SubmitButton>
            </Form>
        </Container>
    );
}
