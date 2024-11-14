import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { PropsWithChildren, ReactElement } from "react";

interface StatCardProps {
  readonly title: string;
  readonly value?: number;
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
        <Box height={height ?? undefined} minHeight={minHeight ?? undefined}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
