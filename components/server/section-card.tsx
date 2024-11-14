import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { PropsWithChildren, ReactElement } from "react";
import { Stack } from "@mui/material";

interface StatCardProps {
  readonly title: string;
  readonly value?: Readonly<ReactElement>;
  readonly caption?: string;
  readonly height?: number;
  readonly minHeight?: number;
}

const SectionCard = ({
  title,
  value,
  caption,
  height,
  minHeight,
  children,
}: Readonly<PropsWithChildren<StatCardProps>>): ReactElement => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="p">
          {value}
        </Typography>
        <Typography component="h3" variant="caption" gutterBottom>
          {caption}
        </Typography>
        <Stack height={height ?? undefined} minHeight={minHeight ?? undefined}>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
