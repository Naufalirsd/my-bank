import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Header = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

const DetailCard = styled.div`
    background-color: #f8f9fa;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #e9ecef;
    border-radius: 5px;
`;

const DetailItem = styled.div`
    margin-bottom: 10px;
    font-size: 16px;
    color: #495057;
`;

const BackButton = styled.button`
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
`;

export default function Handler() {
    const router = useRouter();
    const { idDetail } = router.query;
    const [showData, setShowData] = useState();

    useEffect(() => {
        if (!idDetail) return;
        fetch(`/api/getDataDetail?id=${idDetail}`)
            .then((res) => res.json())
            .then((data) => {
                setShowData(data.data);
            });
    }, [idDetail]);

    return (
        <Container>
            <Header>Detail Data</Header>
            {showData ? (
                <DetailCard>
                    <DetailItem>
                        <strong>Id:</strong> {idDetail}
                    </DetailItem>
                    <DetailItem>
                        <strong>Title:</strong> {showData.title}
                    </DetailItem>
                    <DetailItem>
                        <strong>Contain:</strong> {showData.contain}
                    </DetailItem>
                    <DetailItem>
                        <strong>updated At:</strong> {showData.updated_at}
                    </DetailItem>
                    <DetailItem>
                        <strong>Created At:</strong> {showData.created_at}
                    </DetailItem>
                </DetailCard>
            ) : (
                <p>Loading...</p>
            )}
            <BackButton onClick={() => router.push("/")}>
                Back to Home
            </BackButton>
        </Container>
    );
}
