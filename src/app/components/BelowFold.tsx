import { ServicesNew } from "./ServicesNew";
import { Benefits } from "./Benefits";
import { MediaGallery } from "./MediaGallery";
import { ContactNew } from "./ContactNew";
import { FooterNew } from "./FooterNew";

type BelowFoldProps = {
  onOpenPrivacyPolicy: () => void;
  onOpenCookiePolicy: () => void;
};

/** Секции под первым экраном — отдельный чанк для быстрой отрисовки Hero. */
export function BelowFold({
  onOpenPrivacyPolicy,
  onOpenCookiePolicy,
}: BelowFoldProps) {
  return (
    <>
      <ServicesNew />
      <Benefits />
      <MediaGallery />
      <ContactNew onOpenPrivacyPolicy={onOpenPrivacyPolicy} />
      <FooterNew
        onOpenCookiePolicy={onOpenCookiePolicy}
        onOpenPrivacyPolicy={onOpenPrivacyPolicy}
      />
    </>
  );
}
