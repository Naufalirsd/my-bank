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

export default function AddData() {
    const [inputValueNamaTransaksi, setInputValueNamaTransaksi] = useState("");
    const [inputValueIncome, setInputValueIncome] = useState(0);
    const [inputValueOutcome, setInputValueOutcome] = useState(0);
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const created_at = new Date();
        const tanggal = created_at.getDate();
        const bulan = created_at.getMonth() + 1; // bulan dimulai dari 0
        const tahun = created_at.getFullYear();

        const dataToSend = {
            nama_transaksi: inputValueNamaTransaksi,
            income: inputValueIncome,
            outcome: inputValueOutcome,
            created_at: created_at,
            tanggal: tanggal,
            bulan: bulan,
            tahun: tahun,
        };

        console.log("Sending data: ", dataToSend);

        fetch(`/api/insertData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(
                            errorData.message || "Gagal menambah data"
                        );
                    });
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
                alert("Error: " + err.message);
            });
    };

    return (
        <Container>
            <Header>Tambah Data Transaksi</Header>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nama Transaksi:</Label>
                    <Input
                        type="text"
                        maxLength="20"
                        value={inputValueNamaTransaksi}
                        onChange={(e) =>
                            setInputValueNamaTransaksi(e.target.value)
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Income:</Label>
                    <Input
                        type="number"
                        value={inputValueIncome}
                        onChange={(e) =>
                            setInputValueIncome(parseInt(e.target.value))
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Outcome:</Label>
                    <Input
                        type="number"
                        value={inputValueOutcome}
                        onChange={(e) =>
                            setInputValueOutcome(parseInt(e.target.value))
                        }
                    />
                </FormGroup>
                <SubmitButton type="submit">Add Data</SubmitButton>
            </Form>
        </Container>
    );
}
