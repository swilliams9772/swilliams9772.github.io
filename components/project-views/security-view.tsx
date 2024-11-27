"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Lock,
  AlertTriangle,
  FileWarning,
  CheckCircle,
  Activity,
  Network,
  Bug,
  Search,
  Eye,
  Key,
  RefreshCw
} from 'lucide-react'
import type { Project } from '@/types'

interface SecurityViewProps {
  project: Project
}

export function SecurityView({ project }: SecurityViewProps) {
  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Security Overview</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.security?.overview && (
              <div className="space-y-4">
                <h4 className="font-medium">Security Features</h4>
                {project.security.overview.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{feature.name}</h5>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      {feature.status && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "mt-2",
                            feature.status === 'Implemented' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                          )}
                        >
                          {feature.status}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {project.security?.compliance && (
              <div className="space-y-4">
                <h4 className="font-medium">Compliance & Standards</h4>
                {project.security.compliance.map((standard, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{standard.name}</h5>
                      <p className="text-sm text-muted-foreground">{standard.description}</p>
                      <Progress 
                        value={standard.compliance} 
                        className="h-1 mt-2" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Threat Analysis */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Threat Analysis</h3>
          </div>
          {project.security?.threats && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Identified Threats</h4>
                {project.security.threats.map((threat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileWarning className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{threat.name}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Risk Level: {threat.riskLevel}</Badge>
                      <Badge 
                        variant="outline"
                        className={cn(
                          threat.status === 'Mitigated' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        )}
                      >
                        {threat.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Mitigation Strategies</h4>
                {project.security?.mitigations?.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{strategy.name}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{strategy.description}</p>
                    <Progress 
                      value={strategy.implementation} 
                      className="h-1" 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Testing */}
      {project.security?.testing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bug className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Security Testing</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Test Results</h4>
                {project.security.testing.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">{result.name}</h5>
                      <Badge 
                        variant="outline"
                        className={cn(
                          result.status === 'Passed' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                        )}
                      >
                        {result.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.details}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Monitoring & Alerts</h4>
                {project.security.testing.monitoring.map((monitor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{monitor.name}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{monitor.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {monitor.metrics.map((metric, i) => (
                        <Badge key={i} variant="secondary">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Monitoring */}
      {project.security?.monitoring && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Security Monitoring</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {project.security.monitoring.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 p-4 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {metric.name}
                  </div>
                  <Badge variant="outline">
                    {metric.trend}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 