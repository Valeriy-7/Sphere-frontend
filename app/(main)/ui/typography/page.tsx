import { Table, TableCaption } from "@/components/ui/table";
import { TypographyH2, TypographyH3 } from "@/components/app-typography";

export default function DevUiTypographyPage() {
  return (
    <ul>
      <li>
        <TypographyH2>TypographyH2: Данные организации</TypographyH2>
      </li>
      <li>
        <TypographyH3>TypographyH3: Сейчас на складе (ед)</TypographyH3>
      </li>
      <li>
        <Table>
          <TableCaption>TableCaption: Сейчас на складе (ед)</TableCaption>
        </Table>
      </li>
    </ul>
  );
}
