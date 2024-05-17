import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
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

export default function Home() {
    const router = useRouter();
    const [dataDetail, setDetail] = useState();

    const { idEdit } = router.query;

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDetail(data.data ? data.data : null);
                console.log(data.data);
            });
    }, [idEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const contain = event.target.contain.value;
        const upload_at = new Date();

        fetch(`/api/updateData`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                contain: contain,
                upload_at: upload_at,
                id: idEdit,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                router.push(`/`);
            })
            .catch((data) => {
                alert("error: ", data.message);
            });
    };

    return (
        <Container>
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail && (
                <div>
                    <Header>Edit Data</Header>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="title">Title:</Label>
                            <Input
                                name="title"
                                defaultValue={dataDetail.title}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="contain">Contain:</Label>
                            <Input
                                name="contain"
                                defaultValue={dataDetail.contain}
                            />
                        </FormGroup>
                        <SubmitButton type="submit">Update Data</SubmitButton>
                    </Form>
                </div>
            )}
        </Container>
    );
}
