import EditMenu from "@/components/admin/menu/EditMenu";

interface EditMenuPageProps {
  params: Promise<{ menuId: string }>;
}

export default async function EditMenuPage({ params }: EditMenuPageProps) {
  const { menuId } = await params;

  return <EditMenu menuId={Number(menuId)} />;
}
