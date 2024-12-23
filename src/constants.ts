import { Game } from "./lib/types";

export const HEADLINE =
  "An open marketplace and launchpad for AI Gaming Models & Agents";
export const SUBHEADLINE =
  "Create, train and launch AI Gaming Agents for Web3 games.";
export const games: Game[] = [
  {
    id: "street-fighter",
    imageUrl: "/modals/streetfighter.webp",
    name: "STREET FIGHTER",
    ticker: "$SF6",
    category: "Fighting",
    description:
      "A legendary fighting game series where world warriors compete in hand-to-hand combat using unique martial arts.",
    shortDescription:
      "Legendary fighting game series with unique martial arts combat.",
    contractAddress: "0x1C4c...F463a3",
    downloads: { total: 1799, weekly: 248 },
    longDescription:
      "Street Fighter has been the cornerstone of fighting game culture for over three decades. Each character brings their own distinct martial arts style, creating a diverse and dynamic combat system that has evolved with each iteration. The game emphasizes technical skill, strategy, and split-second decision making.",
    geckoTerminalUrl: "https://www.geckterminal.com/sf6",
    codes: [
      {
        id: "sf-1",
        title: "Hadoken Motion Detection",
        content:
          `import retro
from gym import Env
from gym.spaces import MultiBinary, Box
import numpy as np
import cv2
from stable_baselines3 import PPO

class GameEnv(Env):
    def __init__(self):
        super().__init__()
        self.observation_space = Box(low=0, high=255, shape=(84, 84, 1), dtype=np.uint8)
        self.action_space = MultiBinary(12)

        self.game = retro.make(game='StreetFighterIISpecialChampionEdition-Genesis',
                               use_restricted_actions=retro.Actions.FILTERED)

        self.info = {'enemy_matches_won': 0,
                     'score': 0,
                     'matches_won': 0,
                     'continuetimer': 0,
                     'enemy_health': 176,
                     'health': 176
                     }

    def reset(self):
        obs = self.game.reset()
        obs = self.preprocess(obs)
        self.previous_frame = obs
        self.score = 0
        self.info = {'enemy_matches_won': 0,
                     'score': 0,
                     'matches_won': 0,
                     'continuetimer': 0,
                     'enemy_health': 176,
                     'health': 176
                     }
        return obs

    def preprocess(self, observation):
        gray = cv2.cvtColor(observation, cv2.COLOR_BGR2GRAY)
        resize = cv2.resize(gray, (84, 84), interpolation=cv2.INTER_CUBIC)
        channels = np.reshape(resize, (84, 84, 1))
        return channels

    def get_reward(self, step_info):
        reward = (step_info['score'] - self.info['score'])
        match_end = False
        ew = self.info['enemy_matches_won'] - step_info['enemy_matches_won']
        if ew == -1:
            reward -= 10000
            match_end = True
        pw = self.info['matches_won'] - step_info['matches_won']
        if ew == 1:
            reward += 10000
            match_end = True

        if not match_end:
            h1 = 10 * (self.info['enemy_health'] - step_info['enemy_health'])
            if h1 > 0:
                reward += h1
            h2 = 10 * (step_info['health'] - self.info['health'])
            if h2 < 0:
                reward += h2
        self.info = step_info
        return reward

    def step(self, action):
        obs, reward, done, info = self.game.step(action)
        obs = self.preprocess(obs)

        frame_delta = obs - self.previous_frame
        self.previous_frame = obs
        reward = self.get_reward(info)
        return frame_delta, reward, done, info

    def render(self, *args, **kwargs):
        self.game.render()

    def close(self):
        self.game.close()

if __name__ == '__main__':
    env = GameEnv()
    model = PPO.load('./train/best_model_10000000.zip')
    obs = env.reset()
    done = False
    for game in range(10):
        while not done:
            if done:
                obs = env.reset()
            env.render()
            action = model.predict(obs)[0]
            obs, reward, done, info = env.step(action)
            print(action, reward)`,
        author: "FightingGameDev",
        date: "2024-01-15",
      },
    ],
    discussions: [
      {
        id: "sf-d1",
        title: "Frame Data Analysis",
        content: "Detailed breakdown of SF6 frame data and move properties.",
        author: "ComboMaster",
        date: "2024-02-01",
      },
    ],
    competitions: [
      {
        id: "sf-c1",
        title: "World Warrior Tournament",
        status: "Active",
        prize: "10,000 USDC",
        endDate: "2024-12-31",
      },
    ],
  },
  {
    id: "genopets",
    imageUrl: "/modals/genopots.webp",
    name: "GENOPETS",
    ticker: "$GENE",
    category: "Move-to-Earn",
    description: "The world's first Move-to-Earn NFT Game.",
    shortDescription: "Pioneer in move-to-earn gaming.",
    contractAddress: "0x2D4c...E563b4",
    downloads: { total: 2150, weekly: 312 },
    longDescription:
      "Genopets revolutionizes the gaming landscape by introducing the first-ever move-to-earn NFT gaming experience. Players can earn rewards by staying active in real life, nurturing their digital pets, and participating in various in-game activities.",
    geckoTerminalUrl: "https://www.geckterminal.com/genopets",
    codes: [
      {
        id: "sf-1",
        title: "Movement Detection AI",
        content: `# Import required libraries
  import time
  import keyboard
  import torch
  import pyautogui as pg
  import matplotlib.pyplot as plt
  from torchvision import transforms
  from nets.shufflenet import ShuffleNetV2
  
  class Predictor:
      def __init__(self, model, dims, pred_action=lambda x: x, gpu=True):
          self.pred_action = pred_action
          self.device = 'cuda' if torch.cuda.is_available() and gpu else 'cpu'
          self.model = model.to(self.device)
          self.model.eval()
          self.logsoftmax = torch.nn.LogSoftmax(dim=1).to(self.device)
          self.softmax = torch.nn.Softmax(dim=1).to(self.device)
          self.dims = dims
  
      def preprocess(self, img):
          preprocess = transforms.Compose([
              transforms.Resize(256),
              transforms.CenterCrop(224),
              transforms.ToTensor(),
              transforms.Normalize(
                  mean=[0.485, 0.456, 0.406], 
                  std=[0.229, 0.224, 0.225]
              ),
          ])
          img = preprocess(img)
          img = torch.transpose(img, 1, 2)
          img = torch.unsqueeze(img, 0)
          return img
  
      def predict(self, img, probs=False):
          img = self.preprocess(img)
          with torch.no_grad():
              img = img.to(self.device)
              output = self.model(img)
              
              if not probs:
                  output = self.logsoftmax(output)
                  decision = torch.argmax(output, dim=1)
                  return decision.item()
              else:
                  output = self.softmax(output)
                  value, indices = torch.max(output, dim=1)
                  return value.item(), indices.item()
  
      def take_screenshot(self):
          img = pg.screenshot()
          img = img.crop(self.dims)
          img = img.resize((238, 412))
          return img
  
      def run(self):
          frame = self.take_screenshot()
          prob, pred = self.predict(frame, probs=True)
          return self.pred_action((prob, pred))
  
  class PerformGameAction:
      def __init__(self):
          self.lean_delay = 0.5
          self.last_lean = -1
          self.last_pred = -1
          self.label_fun_dict = {
              0: self.neutral,
              1: self.left,
              2: self.right
          }
          self.label_dict = {
              0: 'neutral',
              1: 'left',
              2: 'right'
          }
  
      def right(self):
          t = time.time()
          if t - self.last_lean >= self.lean_delay:
              self.last_lean = t
              pg.press('right')
              return True
          return False
  
      def left(self):
          t = time.time()
          if t - self.last_lean >= self.lean_delay:
              self.last_lean = t
              pg.press('left')
              return True
          return False
  
      def neutral(self):
          self.last_lean = -1
  
      def __call__(self, out, log=True):
          prob, pred = out
          if pred in [1, 2] and prob < 0.6:
              pred = 0
          self.label_fun_dict[pred]()
          if pred in [1, 2]:
              print(f"{self.label_dict[pred]} - {round(prob*100, 2)}%")
  
  if __name__ == '__main__':
      # Initialize model
      m = ShuffleNetV2([4, 8, 4], [24, 116, 232, 464, 1024], num_classes=3)
      m.load_state_dict(torch.load('13_0.92.pth', map_location=torch.device('cpu')))
      
      # Create predictor
      p = Predictor(m, pred_action=PerformGameAction())
      print("Started")
      
      # Main loop
      while True:
          if keyboard.is_pressed('p'):
              break
          p.run()`,
        author: "FightingGameDev",
        date: "2024-01-15",
      },
    ],
    discussions: [],
    competitions: [],
  },
  {
    id: "aurory",
    imageUrl: "/modals/aurory.webp",
    name: "AURORY",
    ticker: "$AURY",
    category: "RPG",
    description:
      "A Web3 game studio anchored in innovative, F2P, interoperable gaming experiences.",
    shortDescription: "Innovative F2P gaming experiences.",
    contractAddress: "0x3E5d...G663c5",
    downloads: { total: 1560, weekly: 195 },
    longDescription:
      "Aurory represents the future of gaming with its innovative approach to F2P experiences. The game combines stunning visuals with deep gameplay mechanics, creating an immersive world where players can truly own their in-game assets.",
    geckoTerminalUrl: "https://www.geckterminal.com/aurory",
    codes: [],
    discussions: [],
    competitions: [],
  },
  {
    id: "astrospace",
    imageUrl: "/modals/astrospace.webp",
    name: "ASTROSPACE",
    ticker: "$ASTRO",
    category: "Strategy",
    description:
      "AstroSpace is the first Farm-To-Steal mobile gaming app on Solana",
    shortDescription: "Revolutionary farm-to-steal gaming.",
    contractAddress: "0x4F6e...H763d6",
    downloads: { total: 1890, weekly: 276 },
    longDescription:
      "AstroSpace introduces a unique farm-to-steal mechanic on the Solana blockchain. Players must balance resource management with strategic raids, creating an engaging gameplay loop that rewards both patience and cunning.",
    geckoTerminalUrl: "https://www.geckterminal.com/astrospace",
    codes: [],
    discussions: [],
    competitions: [],
  },
  {
    id: "star-atlas",
    imageUrl: "/modals/staratlas.webp",
    name: "STARATLAS",
    ticker: "$ATLAS",
    category: "Metaverse",
    description:
      "Virtual gaming metaverse on the Solana blockchain with Unreal Engine 5 real-time graphics.",
    shortDescription: "Next-gen blockchain gaming metaverse.",
    contractAddress: "0x5G7f...I863e7",
    downloads: { total: 2340, weekly: 385 },
    longDescription:
      "Star Atlas pushes the boundaries of blockchain gaming with its impressive Unreal Engine 5 powered graphics. This space-themed metaverse offers players unprecedented freedom to explore, trade, and compete in a vast virtual universe.",
    geckoTerminalUrl: "https://www.geckterminal.com/staratlas",
    codes: [],
    discussions: [],
    competitions: [],
  },
];
