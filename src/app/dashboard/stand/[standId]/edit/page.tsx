import EditStand from "@/components/dashboard/stand/EditStand";

interface EditStandPageProps {
  params: Promise<{ standId: string }>;
}

export default async function EditStandPage({ params }: EditStandPageProps) {
  const { standId } = await params;

  return <EditStand standId={Number(standId)} />;
}
