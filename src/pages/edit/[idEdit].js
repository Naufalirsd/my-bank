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

export default function EditData() {
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
        const nama_transaksi = event.target.nama_transaksi.value;
        const income = parseInt(event.target.income.value);
        const outcome = parseInt(event.target.outcome.value);
        const created_at = new Date();
        const tanggal = created_at.getDate();
        const bulan = created_at.getMonth() + 1;
        const tahun = created_at.getFullYear();

        fetch(`/api/updateData`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idEdit,
                nama_transaksi: nama_transaksi,
                income: income,
                outcome: outcome,
                created_at: created_at,
                tanggal: tanggal,
                bulan: bulan,
                tahun: tahun,
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
                    <Header>Edit Data Transaksi</Header>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Nama Transaksi:</Label>
                            <Input
                                name="nama_transaksi"
                                defaultValue={dataDetail.nama_transaksi}
                                maxLength="20"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Income:</Label>
                            <Input
                                name="income"
                                type="number"
                                defaultValue={dataDetail.income}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Outcome:</Label>
                            <Input
                                name="outcome"
                                type="number"
                                defaultValue={dataDetail.outcome}
                            />
                        </FormGroup>
                        <SubmitButton type="submit">Update Data</SubmitButton>
                        <button
                            onClick={() => {
                                router.push(`/`);
                            }}>
                            Kembali
                        </button>
                    </Form>
                </div>
            )}
        </Container>
    );
}
