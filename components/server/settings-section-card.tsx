import type { PropsWithChildren, ReactElement } from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

interface SettingsSectionProps {
  readonly title: string;
}

const SettingsSectionCard = ({
  title,
  children,
}: Readonly<PropsWithChildren<SettingsSectionProps>>): ReactElement => {
  return (
    <Card>
      <CardContent>
        <Typography component="h2" variant="h6">
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default SettingsSectionCard;
