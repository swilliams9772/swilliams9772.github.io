"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { cn } from '@/lib/utils'
import { 
  Trophy,
  Star,
  Target,
  Zap,
  Award,
  Crown,
  Medal,
  Flame,
  Rocket,
  Lightning
} from 'lucide-react'

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  date: string;
  category: string;
}

interface AchievementBadgesProps {
  achievements: Achievement[];
  className?: string;
}

const levelColors = {
  bronze: "from-orange-500/20 to-amber-500/20",
  silver: "from-slate-400/20 to-zinc-500/20",
  gold: "from-yellow-400/20 to-amber-500/20",
  platinum: "from-indigo-400/20 to-violet-500/20"
};

const levelIcons = {
  bronze: Medal,
  silver: Star,
  gold: Crown,
  platinum: Trophy
};

export function AchievementBadges({ achievements, className }: AchievementBadgesProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {achievements.map((achievement, index) => {
        const LevelIcon = levelIcons[achievement.level];
        const AchievementIcon = achievement.icon;
        
        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Card className={cn(
              "p-4 hover:shadow-lg transition-all duration-300",
              `bg-gradient-to-r ${levelColors[achievement.level]}`
            )}>
              <div className="absolute -top-2 -right-2">
                <Badge 
                  variant="outline"
                  className={cn(
                    "capitalize font-medium",
                    achievement.level === 'platinum' && "bg-violet-500/10 text-violet-500",
                    achievement.level === 'gold' && "bg-yellow-500/10 text-yellow-500",
                    achievement.level === 'silver' && "bg-zinc-500/10 text-zinc-500",
                    achievement.level === 'bronze' && "bg-orange-500/10 text-orange-500"
                  )}
                >
                  <LevelIcon className="h-3 w-3 mr-1" />
                  {achievement.level}
                </Badge>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-2 rounded-full bg-background">
                  <AchievementIcon className="h-8 w-8 text-primary" />
                </div>
                
                <h4 className="font-medium text-sm">{achievement.name}</h4>
                
                <p className="text-xs text-muted-foreground">
                  {achievement.description}
                </p>
                
                <div className="text-xs text-muted-foreground mt-2">
                  {achievement.date}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
} 