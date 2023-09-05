import MintCTAButton from "./MintCTAButton"

const CTAButtons = () => (
  <div className="flex justify-center gap-x-[20px] pt-[30px] fade_in_text">
    <MintCTAButton
      id="opensea_cta_btn"
      bgLink="/assets/MintV2/opensea.svg"
      blurBgLink="/assets/MintV2/opensea.png"
      link="https://opensea.io/collection/cre8orsaipeps"
    />
    <MintCTAButton
      id="twitter_cta_btn"
      bgLink="/assets/MintV2/twitter.svg"
      blurBgLink="/assets/MintV2/twitter.png"
      link="https://twitter.com/Cre8orsNFT"
    />
    <MintCTAButton
      id="discord_cta_btn"
      bgLink="/assets/MintV2/discord.svg"
      blurBgLink="/assets/MintV2/discord.png"
      link="https://discord.gg/ZpZBHCrqHQ"
    />
  </div>
)

export default CTAButtons
