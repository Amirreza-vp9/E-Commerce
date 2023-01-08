import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "transparent",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMoreIcon sx={{ fontSize: "1.25rem", color: "#242424" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#444444",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0.5),
  },
  "&:hover": {
    backgroundColor: "#bebebe",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#444444",
  color: "#c7c5c5",
  "&:hover": {
    backgroundColor: "#505050",
  },
}));

interface Props {
  index: number;
  text: string;
  icon: any;
}

export default function CustomizedAccordions({ index, text, icon }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Accordion
        expanded={expanded === `panel${index + 1}`}
        onChange={handleChange(`panel${index + 1}`)}
      >
        <AccordionSummary
          aria-controls={`panel${index + 1}d-content`}
          id={`panel${index + 1}d-content`}
        >
          {icon}
          <Typography sx={{ ml: 3 }}>{text}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>items</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
