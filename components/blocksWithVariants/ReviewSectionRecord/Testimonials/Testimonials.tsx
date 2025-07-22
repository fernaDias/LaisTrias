import { Box, Container, Grid } from "@chakra-ui/react";
import SectionTitle from "@/components/SectionTitle";
import Testimonial from "@/components/blocksWithVariants/ReviewSectionRecord/Testimonials/Testimonial";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ReviewSectionFragmentDoc } from "@/graphql/types/graphql";

type Props = {
  fragment: FragmentType<typeof ReviewSectionFragmentDoc>;
};

const Testimonials = ({ fragment }: Props) => {
  const {
    reviews,
    reviewSectionHeader: header,
    reviewSectionSubheader: subheader,
  } = getFragmentData(ReviewSectionFragmentDoc, fragment);

  return (
    <Box
      id="testimonials"
      as="section"
      position="relative"
      zIndex={10}
      bg="primaryAlpha.50" // opcional, você pode definir esse token no theme para corresponder ao bg-primary/[.03]
      py={{ base: 16, md: 20, lg: 28 }}
      textAlign={{ base: "center", lg: "start" }}
    >
      <Container maxW="container.xl">
        <SectionTitle title={header} paragraph={subheader} center />

        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: 10, md: 10, lg: 8 }}
        >
          {reviews.map((review) => (
            <Testimonial key={review.id} fragment={review} />
          ))}
        </Grid>
      </Container>

      {/* SVG decorativo superior direito */}
      <Box position="absolute" top="5" right="0" zIndex={-1} />

      {/* SVG decorativo inferior esquerdo */}
      <Box position="absolute" bottom="5" left="0" zIndex={-1} />
    </Box>
  );
};

export default Testimonials;
